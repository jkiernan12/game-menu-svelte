import { bgg } from '../utils/constants';
import { XMLParser } from 'fast-xml-parser';
import {decode} from 'html-entities';

export interface Game {
  description: string;
  name: {
    type?: string;
    value: string;
  }[];
  image: string;
  thumbnail: string;
  minplayers: {value: string};
  maxplayers: {value: string};
  minplaytime: {value: string};
  maxplaytime: {value: string};
  statistics: {
    ratings: {
      average: {
        value: string;
      };
      averageweight: {
        value: string;
      }
    }
  }
}

export const getGames = async (username: string) : Promise<Game[]> => {
  const parser = new XMLParser({ignoreAttributes: false});
  // get user game IDs
  const res = await fetch(bgg + `collection?username=${username}`).then(response => response.text());
  const gameIds = parser.parse(res).items.item.map((game: any) => game['@_objectid']);
  const gameIdString = gameIds.join(',');

  // get game data
  const gamesXml = await fetch(bgg + 'thing?id=' + gameIdString + '&stats=1').then(response => response.text());
  const gamesParser = new XMLParser({attributeNamePrefix: '', ignoreAttributes: false, isArray: (name) => name === 'name'});
  const games: Game[] = gamesParser.parse(gamesXml).items.item;

  // decode html char codes in text
  const decodedGames = games.map(game => {
    return {
      ...game,
      title: [{value: decode(game.name[0].value)}], // only decode title we're using
      description: decode(game.description),
    }
  })

  return decodedGames;
}

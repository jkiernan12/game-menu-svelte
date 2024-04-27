import { bgg } from '../utils/constants';
import { XMLParser } from 'fast-xml-parser';

export interface Game {
  description: string;
  name: {
    type: string;
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
  const res = await fetch(bgg + `collection?username=${username}`).then(response => response.text());
  const gameIds = parser.parse(res).items.item.map((game: any) => game['@_objectid']);
  const gameIdString = gameIds.join(',');
  const gamesXml = await fetch(bgg + 'thing?id=' + gameIdString + '&stats=1').then(response => response.text());
  const gamesParser = new XMLParser({attributeNamePrefix: '', ignoreAttributes: false, isArray: (name) => name === 'name'});
  const games = gamesParser.parse(gamesXml).items.item;
  console.log(games[0])

  return games;
}
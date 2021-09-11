import { app as appType } from 'electron';
import { Browser } from 'puppeteer-core';
import pieType from 'puppeteer-in-electron';
import { DefaultReturn } from '../../@types/controller';

const puppeteer = require('puppeteer-core');


interface IPuppeteer {
  app: typeof appType;
  pie: typeof pieType
}

export const initPuppeteer = ({ app, pie }: IPuppeteer) => {
  const startPuppeteer = async (): Promise<DefaultReturn<Browser>> => {
    const browser = await pie.connect(app, puppeteer);

    if (!browser) {
      return {
        error: 'Browser not found'
      }
    }

    return {
      result: browser
    };
  }

  const endPuppeteer = async (browser: Browser): Promise<DefaultReturn<boolean>> => {
    try {
      browser.close();

      return {
        result: true,
      };

    } catch (err) {
      return {
        error: err.message,
      };
    }
  }

  return {
    startPuppeteer,
    endPuppeteer,
  }
}


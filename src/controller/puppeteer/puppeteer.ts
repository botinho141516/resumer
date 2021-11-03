import { BrowserWindow, app } from 'electron';
import { DefaultReturn } from '../../@types/controller';
import pie from 'puppeteer-in-electron';

const puppeteer = require('puppeteer-core');


export const initPuppeteer = async () => {

  const browser = await pie.connect(app, puppeteer);


  const closeWindow = async (window: BrowserWindow): Promise<DefaultReturn<boolean>> => {
    try {
      window.destroy();

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
    browser,
    closeWindow,
  }
}


import { initControllers } from "./controllers";
import { initPuppeteer } from "./puppeteer/puppeteer";
import { initResoomerPuppeteer } from "./puppeteer/resoomer";

export interface DefaultReturn<T> {
  error?: string;
  result?: T;
}

const puppeteer = initPuppeteer();
const resoomer = initResoomerPuppeteer();
const controllers = initControllers({ puppeteer, resoomer });

export default controllers;
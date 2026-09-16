// D:\PROYECTOS\drafteados\src\lib\basketball\providers\index.ts
import { BasketballDataProvider } from './interface';
import { MockProvider } from './mock';

export function getProvider(): BasketballDataProvider {
  return new MockProvider();
}

export * from './interface';
export * from './mock';

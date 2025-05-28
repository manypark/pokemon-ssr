import { CommonEngine } from '@angular/ssr/node';
import { render } from '@netlify/angular-runtime/common-engine';

const commonEngine = new CommonEngine();

export async function netlifyAppEngineHandler(request: Request): Promise<Response> {
  return await render(commonEngine);
}
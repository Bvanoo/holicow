import { ProblemService } from "../domain/services/ProblemService";
import { ProblemRepositoryHttp } from "../dal/repositories/IProblemRepository";
import { AxiosHttpClient } from '../dal/http/AxiosHttpClient'
import type { App } from "vue";

export function registerDependencies(app: App) {

  const http = new AxiosHttpClient();
  
  const propRepository = new ProblemRepositoryHttp(http);
  const probService = new ProblemService(propRepository);

  // provide global
  app.provide("problemService", probService);
}

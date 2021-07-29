import { expect as expectCDK, haveResource } from "@aws-cdk/assert";
import * as cdk from "@aws-cdk/core";
import * as MyApp from "../lib/app";

const OLD_ENV = process.env;
beforeEach(() => {
  jest.resetModules();
  process.env = { ...OLD_ENV };
});
afterAll(() => {
  process.env = { ...OLD_ENV };
});
test("can instantiate webapp stack", () => {
  const app = new cdk.App();
  process.env.GITHUB_REPOSITORY = "douglasnaphas/summoning-button";
  process.env.GITHUB_REF = "refs/heads/master";
  const stack = new MyApp.SummoningButtonApp(app, "MyTestWebapp");
});

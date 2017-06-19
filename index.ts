const lighthouse = require('lighthouse');
const chromeLauncher = require('lighthouse/chrome-launcher/chrome-launcher');

interface LighthouseStatsConfigTarget {
  name: string;
  url: string;
}

interface LighthouseStatsConfig {
  targets: LighthouseStatsConfigTarget[];
}

const config: LighthouseStatsConfig = require("./lighthouse-stats.config");

async function launchChrome() {
  return await chromeLauncher.launch();
}

async function stopChrome(chrome) {
  return await chrome.kill();
}

const flags = {output: 'json'};

async function doLighthouse() {
  console.log("Launching Chrome...");
  var chrome = await launchChrome();
  flags["port"] = chrome.port;
  console.log("Running lighthouse for " + config.targets.length + " targets");

  for (var index = 0; index < config.targets.length; index++) {
    var target = config.targets[index];
    console.log("Running lighthouse for " + target.name + " (" + target.url + ")");
    var results = await lighthouse(target.url, flags, null);

    results.reportCategories.forEach(category => {
      console.log(category.name);
      console.log(category.score);
    });
  }

  await stopChrome(chrome);
}

doLighthouse();
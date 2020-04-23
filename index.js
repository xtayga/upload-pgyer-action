const core = require("@actions/core");
const uploadFile = require("./uploadFile");

async function main() {
  try {
    // inputs from action
    const forms = core.getInput("forms");
    const formsMap = jsonToMap(forms);
    const fileForms = core.getInput("fileForms");
    const fileFormsMap = jsonToMap(fileForms);

    console.log(forms);
    console.log(fileForms);

    // http request to external API
    const response = await uploadFile(
      "https://www.pgyer.com/apiv2/app/upload",
      formsMap,
      fileFormsMap
    );

    const statusCode = response.status;
    const data = response.data;

    console.log(JSON.stringify(data, undefined, 2));

    if (statusCode >= 400) {
      core.setFailed(`HTTP request failed with status code: ${statusCode}`);
    } else {
      core.setOutput("buildName", data.buildName);
      core.setOutput("buildKey", data.buildKey);
      core.setOutput(
        "buildFileSize",
        (data.buildFileSize / 1024 / 1024).toFixed(2)
      );
      core.setOutput("buildIdentifier", data.buildIdentifier);
      core.setOutput("buildType", data.buildType);
      core.setOutput("buildIsFirst", data.buildIsFirst);
      core.setOutput("buildIsLastest", data.buildIsLastest);
      core.setOutput("buildVersion", data.buildVersion);
      core.setOutput("buildVersionNo", data.buildVersionNo);
      core.setOutput("buildBuildVersion", data.buildBuildVersion);
      core.setOutput("buildDescription", data.buildDescription);
      core.setOutput("buildUpdateDescription", data.buildUpdateDescription);
      core.setOutput("buildCreated", data.buildCreated);
      core.setOutput("buildUpdated", data.buildUpdated);
      core.setOutput("buildQRCodeURL", data.buildQRCodeURL);
      core.setOutput("buildShortcutUrl", data.buildShortcutUrl);
      core.setOutput("buildScreenShots", data.buildScreenShots);
      core.setOutput(
        "buildIconUrl",
        `https://appicon.pgyer.com/image/view/app_icons/${data.buildIcon}`
      );
      core.setOutput(
        "buildInstallUrl",
        `https://www.pgyer.com/apiv2/app/install?_api_key=${formsMap._api_key}&buildKey=${data.buildKey}&buildPassword=${formsMap.buildPassword}`
      );
    }
  } catch (error) {
    console.log(error);
    core.setFailed(error.message);
  }
}

function objToStrMap(obj) {
  let strMap = new Map();
  for (let k of Object.keys(obj)) {
    strMap.set(k, obj[k]);
  }
  return strMap;
}
/**
 *json转换为map
 */
function jsonToMap(jsonStr) {
  return objToStrMap(JSON.parse(jsonStr));
}

main();

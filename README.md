# Upload PGYER Action

上传 apk 或 ipa 文件到蒲公英

## Usage

```yaml
- name: Upload PGYER File
  id: pgyer
  uses: xtayga/upload-pgyer-action@master
  with:
    url: https://www.pgyer.com/apiv2/app/upload
    forms: '{"_api_key":"${{ secrets.pgyer_key }}","buildInstallType":2,"buildPassword":"${{ secrets.pgyer_pass }}","buildName":"appname"}'
    fileForms: '{"file":"app/build/outputs/apk/release/app-release.apk"}'
```

## Inputs

| Parameter   | Required | Info                                                                |
| ----------- | -------- | ------------------------------------------------------------------- |
| `forms`     | `false`  | Data to be transmitted,such as key, pwd, etc. Use json format       |
| `fileForms` | `false`  | Files to be transferred,such as 'file','image' etc. Use json format |

## Outputs

Output format: `JSON`

```json
{
  "buildName": "应用名称",
  "buildType": "应用类型（1:iOS; 2:Android）",
  "buildFileSize": "App 文件大小，M单位",
  "buildIsFirst": "是否是第一个App（1:是; 2:否）",
  "buildIsLastest": "是否是最新版（1:是; 2:否）",
  "buildIdentifier": "应用程序包名，iOS为BundleId，Android为包名",
  "buildVersion": "版本号, 默认为1.0 (是应用向用户宣传时候用到的标识，例如：1.1、8.2.1等。)",
  "buildVersionNo": "上传包的版本编号，默认为1",
  "buildIconUrl": "上传包的版本编号，默认为1",
  "buildDescription": "应用介绍",
  "buildUpdateDescription": "应用更新说明",
  "buildBuildVersion": "蒲公英生成的用于区分历史版本的build号",
  "buildCreated": "应用上传时间",
  "buildUpdated": "应用更新时间",
  "buildShortcutUrl": "应用短链接",
  "buildScreenShots": "应用截图的key，需要拼接前缀https://app-screenshot.pgyer.com/image/view/app_screenshots/",
  "buildQRCodeURL": "应用二维码地址",
  "buildKey": "Build Key是唯一标识应用的索引ID",
  "buildInstallUrl": "安装App地址"
}
```

详细请移步到：https://www.pgyer.com/doc/view/api#uploadApp

## Thanks

https://github.com/JantHsueh/upload-file-action

## License

[MIT](LICENSE)

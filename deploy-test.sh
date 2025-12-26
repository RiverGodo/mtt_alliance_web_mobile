#!/bin/bash
echo "拉取代码!"
git pull
echo "开始编译单页应用!"
# cd user
# npm run build
# cd ../
# echo "开始编译多页应用!"
npm run script
echo "开始上传静态资源到OSS!"
distPath="./app/public/dist/"
ossPath="oss://jhyl-static-file/mtta_web_test_mobile/dist"
ossutil64 cp $distPath $ossPath -r -u
echo "上传结束！"
echo "关闭项目！"
npm run tstop
echo "重新启动项目！"
npm run test

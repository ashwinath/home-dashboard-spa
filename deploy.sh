yarn build
rsync -avz -e "ssh -o StrictHostKeyChecking=no -o UserKnownHostsFile=/dev/null" --progress . chat@192.168.1.199:/opt/apps/home-dashboard-spa;
ssh chat@192.168.1.199 "pm2 restart home-dashboard-spa"

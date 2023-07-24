FROM ubuntu:23.10

RUN sudo apt-get update \
    sudo apt-get install ffmpeg \
    curl -fsSL https://deb.nodesource.com/setup_lts.x | sudo -E bash - && \
    sudo apt-get install -y nodejs

WORKDIR /usr/docker

COPY . .

RUN sudo npm i -g yarn

RUN yarn build

CMD ["node", "dist", "-i 'cite tres coisas sobre o pelé'"]
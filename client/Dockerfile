FROM node:18

# Create app directory

WORKDIR /usr/node-app

COPY UniGuide .

RUN npm install --legacy-peer-deps

RUN npm run build

EXPOSE 4173

ENTRYPOINT ["npm", "run", "preview" ]

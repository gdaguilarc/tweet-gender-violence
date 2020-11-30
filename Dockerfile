FROM node:latest as builder

COPY . .

RUN npm install

#RUN npm run build

#FROM nginx:latest as deployer

#COPY --from=builder /build /usr/share/nginx/html

EXPOSE 3000

CMD ["npm", "run", "start"]
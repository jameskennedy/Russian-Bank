FROM node:8.11.4

# Override the base log level (info).
ENV NPM_CONFIG_LOGLEVEL warn

ENV BABEL_ENV=production

RUN mkdir -p /jarvis
WORKDIR /jarvis

# Install and configure `serve`.
RUN yarn global add serve
EXPOSE 5000

# Copy built application files into the image.
COPY build .

# Start container by serving the app
CMD serve -s .



FROM node:20-alpine

WORKDIR /app

COPY package*.json ./

# We install dependencies first to leverage Docker layer caching
RUN npm install

# Copy the rest of the application code
COPY . .

# --- NEW INSTRUCTIONS ---
# Copy the entrypoint script into the container
COPY entrypoint.sh .

# Make the script executable
RUN chmod +x entrypoint.sh
# --- END OF NEW INSTRUCTIONS ---

EXPOSE 3000

# The ENTRYPOINT is the script itself.
# The CMD is the default command that will be passed to the entrypoint script ("$@").
ENTRYPOINT ["./entrypoint.sh"]
CMD ["npm", "run", "dev"]
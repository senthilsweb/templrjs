# Use the base image
FROM devopsfaith/krakend:latest

# Set any environment variables
ENV FC_ENABLE=1 \
    MY_POD_NAMESPACE=templrjs \
    APP_NAME=templrjs

# Copy local configuration files to the container
COPY ./configs /etc/krakend

# Expose the ports that krakend uses
EXPOSE 8080

# Define the command to run
CMD ["run", "-d", "-c", "/etc/krakend/krakend.json"]
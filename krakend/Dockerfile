# Use the base image
FROM devopsfaith/krakend:latest

# Set any environment variables
ENV FC_ENABLE=1 \
    MY_POD_NAMESPACE=templrjs \
    ERP_NEXT_API_TOKEN="token 2b9f3de7c5bcc0a:ffbe06e23ad587e"

# Copy local configuration files to the container
COPY ./configs /etc/krakend

# Expose the ports that krakend uses
EXPOSE 8080

# Define the command to run
CMD ["run", "-d", "-c", "/etc/krakend/krakend.json"]
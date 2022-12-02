FROM mcr.microsoft.com/dotnet/sdk:6.0 AS build-env
WORKDIR /app

# Copy everything from here into the /app on docker 
COPY . .
# Restore as distinct layers
RUN dotnet restore 
# Build and publish a release
RUN dotnet publish --no-restore -c Release -o out

# Build runtime image
FROM mcr.microsoft.com/dotnet/aspnet:6.0
WORKDIR /app
EXPOSE 5000
EXPOSE 5001
COPY --from=build-env /app/out .
ENTRYPOINT ["dotnet", "souschef.server.dll"]
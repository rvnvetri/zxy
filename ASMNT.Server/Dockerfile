
FROM public.ecr.aws/lambda/dotnet:8 AS base
WORKDIR /var/task

FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /src

# Copy everything including all projects
COPY . .

# Build the correct project
RUN dotnet publish ASMNT.Server/ASMNT.Server.csproj -c Release -o /out

FROM base AS final
COPY --from=build /out .

CMD ["ASMNT.Server::ASMNT.Server.LambdaEntryPoint::FunctionHandlerAsync"]

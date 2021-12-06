FROM python:3.8

SHELL ["/bin/bash", "-o", "pipefail", "-c"]
RUN curl -sSL https://get.docker.com | sh -

RUN curl -sL https://deb.nodesource.com/setup_14.x | bash -
RUN apt-get install -y --no-install-recommends nodejs openssh-client

# install hadolint
ARG HADOLINT_VERSION="v1.19.0"
RUN curl -sSL "https://github.com/hadolint/hadolint/releases/download/${HADOLINT_VERSION}/hadolint-Linux-x86_64" --output /usr/bin/hadolint \
    && chmod +x /usr/bin/hadolint

# install shellcheck
ARG SC_VERSION="stable"
RUN curl -sSL "https://github.com/koalaman/shellcheck/releases/download/${SC_VERSION}/shellcheck-${SC_VERSION}.linux.x86_64.tar.xz" | tar -xJv \
    && cp "shellcheck-${SC_VERSION}/shellcheck" /usr/bin/

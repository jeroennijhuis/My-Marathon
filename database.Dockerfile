FROM postgres

RUN apt-get update
RUN apt-get -y install postgresql-contrib

/*global describe, beforeEach, it*/
'use strict';

var path = require('path');
var assert = require('yeoman-assert');
var helpers = require('yeoman-test');
var fse = require('fs-extra');

const constants = require('../generators/generator-constants'),
    DOCKER_DIR = constants.DOCKER_DIR;

const expectedFiles = {
    dockercompose : [
        'docker-compose.yml',
        'jhipster-registry.yml',
        'central-server-config/application.yml'
    ],
    elk : [
        'jhipster-console.yml',
        'log-conf/logstash.conf'
    ],
    prometheus : [
        'prometheus.yml',
        'prometheus-conf/alert.rules',
        'prometheus-conf/prometheus.yml',
        'alertmanager-conf/config.yml'
    ],
    monolith : [
        'docker-compose.yml'
    ]
};

describe('JHipster Docker Compose Sub Generator', function () {

    describe('only gateway', function () {
        beforeEach(function (done) {
            helpers
                .run(require.resolve('../generators/docker-compose'))
                .inTmpDir(function (dir) {
                    fse.copySync(path.join(__dirname, './templates/compose/'), dir);
                })
                .withPrompts({
                    composeApplicationType: 'microservice',
                    directoryPath: './',
                    'chosenApps': [
                        '01-gateway'
                    ],
                    clusteredDbApps: [],
                    monitoring: 'no'
                })
                .on('end', done);
        });
        it('creates expected default files', function () {
            assert.file(expectedFiles.dockercompose);
        });
        it('creates jhipster-registry content', function () {
            assert.fileContent('docker-compose.yml', /jhipster-registry:8761\/config/);
        });
        it('creates compose file without container_name, external_links, links', function () {
            assert.noFileContent('docker-compose.yml', /container_name:/);
            assert.noFileContent('docker-compose.yml', /external_links:/);
            assert.noFileContent('docker-compose.yml', /links:/);
        });
    });

    describe('only one microservice', function () {
        beforeEach(function (done) {
            helpers
                .run(require.resolve('../generators/docker-compose'))
                .inTmpDir(function (dir) {
                    fse.copySync(path.join(__dirname, './templates/compose/'), dir);
                })
                .withPrompts({
                    composeApplicationType: 'microservice',
                    directoryPath: './',
                    'chosenApps': [
                        '02-mysql'
                    ],
                    clusteredDbApps: [],
                    monitoring: 'no'
                })
                .on('end', done);
        });
        it('creates expected default files', function () {
            assert.file(expectedFiles.dockercompose);
        });
        it('creates jhipster-registry content', function () {
            assert.fileContent('docker-compose.yml', /jhipster-registry:8761\/config/);
        });
        it('creates compose file without container_name, external_links, links', function () {
            assert.noFileContent('docker-compose.yml', /container_name:/);
            assert.noFileContent('docker-compose.yml', /external_links:/);
            assert.noFileContent('docker-compose.yml', /links:/);
        });
    });

    describe('gateway and one microservice', function () {
        beforeEach(function (done) {
            helpers
                .run(require.resolve('../generators/docker-compose'))
                .inTmpDir(function (dir) {
                    fse.copySync(path.join(__dirname, './templates/compose/'), dir);
                })
                .withPrompts({
                    composeApplicationType: 'microservice',
                    directoryPath: './',
                    'chosenApps': [
                        '01-gateway',
                        '02-mysql'
                    ],
                    clusteredDbApps: [],
                    monitoring: 'no'
                })
                .on('end', done);
        });
        it('creates expected default files', function () {
            assert.file(expectedFiles.dockercompose);
        });
        it('creates jhipster-registry content', function () {
            assert.fileContent('docker-compose.yml', /jhipster-registry:8761\/config/);
        });
        it('creates compose file without container_name, external_links, links', function () {
            assert.noFileContent('docker-compose.yml', /container_name:/);
            assert.noFileContent('docker-compose.yml', /external_links:/);
            assert.noFileContent('docker-compose.yml', /links:/);
        });
    });

    describe('gateway and one microservice, with elk', function () {
        beforeEach(function (done) {
            helpers
                .run(require.resolve('../generators/docker-compose'))
                .inTmpDir(function (dir) {
                    fse.copySync(path.join(__dirname, './templates/compose/'), dir);
                })
                .withPrompts({
                    composeApplicationType: 'microservice',
                    directoryPath: './',
                    'chosenApps': [
                        '01-gateway',
                        '02-mysql'
                    ],
                    clusteredDbApps: [],
                    monitoring: 'elk'
                })
                .on('end', done);
        });
        it('creates expected default files', function () {
            assert.file(expectedFiles.dockercompose);
        });
        it('creates expected elk files', function () {
            assert.file(expectedFiles.elk);
        });
        it('creates jhipster-registry content', function () {
            assert.fileContent('docker-compose.yml', /jhipster-registry:8761\/config/);
        });
        it('creates compose file without container_name, external_links, links', function () {
            assert.noFileContent('docker-compose.yml', /container_name:/);
            assert.noFileContent('docker-compose.yml', /external_links:/);
            assert.noFileContent('docker-compose.yml', /links:/);
        });
    });

    describe('gateway and one microservice, with prometheus', function () {
        beforeEach(function (done) {
            helpers
                .run(require.resolve('../generators/docker-compose'))
                .inTmpDir(function (dir) {
                    fse.copySync(path.join(__dirname, './templates/compose/'), dir);
                })
                .withPrompts({
                    composeApplicationType: 'microservice',
                    directoryPath: './',
                    'chosenApps': [
                        '01-gateway',
                        '02-mysql'
                    ],
                    clusteredDbApps: [],
                    monitoring: 'prometheus'
                })
                .on('end', done);
        });
        it('creates expected default files', function () {
            assert.file(expectedFiles.dockercompose);
        });
        it('creates expected prometheus files', function () {
            assert.file(expectedFiles.prometheus);
        });
        it('creates jhipster-registry content', function () {
            assert.fileContent('docker-compose.yml', /jhipster-registry:8761\/config/);
        });
        it('creates compose file without container_name, external_links, links', function () {
            assert.noFileContent('docker-compose.yml', /container_name:/);
            assert.noFileContent('docker-compose.yml', /external_links:/);
            assert.noFileContent('docker-compose.yml', /links:/);
        });
    });

    describe('gateway, uaa server and one microservice, with elk', function () {
        beforeEach(function (done) {
            helpers
                .run(require.resolve('../generators/docker-compose'))
                .inTmpDir(function (dir) {
                    fse.copySync(path.join(__dirname, './templates/compose/'), dir);
                })
                .withOptions({force: true})
                .withPrompts({
                    composeApplicationType: 'microservice',
                    directoryPath: './',
                    'chosenApps': [
                        '01-gateway',
                        '02-mysql',
                        '06-uaa'
                    ],
                    clusteredDbApps: [],
                    monitoring: 'elk'
                })
                .on('end', done);
        });
        it('creates expected default files', function () {
            assert.file(expectedFiles.dockercompose);
        });
        it('creates expected elk files', function () {
            assert.file(expectedFiles.elk);
        });
        it('creates jhipster-registry content', function () {
            assert.fileContent('docker-compose.yml', /jhipster-registry:8761\/config/);
        });
        it('creates compose file without container_name, external_links, links', function () {
            assert.noFileContent('docker-compose.yml', /container_name:/);
            assert.noFileContent('docker-compose.yml', /external_links:/);
            assert.noFileContent('docker-compose.yml', /links:/);
        });
    });

    describe('gateway and multi microservices, with elk', function () {
        beforeEach(function (done) {
            helpers
                .run(require.resolve('../generators/docker-compose'))
                .inTmpDir(function (dir) {
                    fse.copySync(path.join(__dirname, './templates/compose/'), dir);
                })
                .withPrompts({
                    composeApplicationType: 'microservice',
                    directoryPath: './',
                    'chosenApps': [
                        '01-gateway',
                        '02-mysql',
                        '03-psql',
                        '04-mongo',
                        '07-mariadb'
                    ],
                    clusteredDbApps: [],
                    monitoring: 'elk'
                })
                .on('end', done);
        });
        it('creates expected default files', function () {
            assert.file(expectedFiles.dockercompose);
        });
        it('creates expected elk files', function () {
            assert.file(expectedFiles.elk);
        });
        it('creates jhipster-registry content', function () {
            assert.fileContent('docker-compose.yml', /jhipster-registry:8761\/config/);
        });
        it('creates compose file without container_name, external_links, links', function () {
            assert.noFileContent('docker-compose.yml', /container_name:/);
            assert.noFileContent('docker-compose.yml', /external_links:/);
            assert.noFileContent('docker-compose.yml', /links:/);
        });
    });

    describe('gateway and multi microservices, with 1 mongodb cluster', function () {
        beforeEach(function (done) {
            helpers
                .run(require.resolve('../generators/docker-compose'))
                .inTmpDir(function (dir) {
                    fse.copySync(path.join(__dirname, './templates/compose/'), dir);
                })
                .withPrompts({
                    composeApplicationType: 'microservice',
                    directoryPath: './',
                    'chosenApps': [
                        '01-gateway',
                        '02-mysql',
                        '03-psql',
                        '04-mongo'
                    ],
                    clusteredDbApps: [
                        '04-mongo'
                    ],
                    monitoring: 'elk'
                })
                .on('end', done);
        });
        it('creates expected default files', function () {
            assert.file(expectedFiles.dockercompose);
        });
        it('creates expected elk files', function () {
            assert.file(expectedFiles.elk);
        });
        it('creates jhipster-registry content', function () {
            assert.fileContent('docker-compose.yml', /jhipster-registry:8761\/config/);
        });
        it('creates compose file without container_name, external_links, links', function () {
            assert.noFileContent('docker-compose.yml', /container_name:/);
            assert.noFileContent('docker-compose.yml', /external_links:/);
            assert.noFileContent('docker-compose.yml', /links:/);
        });
    });

    describe('gateway and 1 microservice, with Cassandra cluster', function () {
        beforeEach(function (done) {
            helpers
                .run(require.resolve('../generators/docker-compose'))
                .inTmpDir(function (dir) {
                    fse.copySync(path.join(__dirname, './templates/compose/'), dir);
                })
                .withPrompts({
                    composeApplicationType: 'microservice',
                    directoryPath: './',
                    'chosenApps': [
                        '01-gateway',
                        '05-cassandra'
                    ],
                    clusteredDbApps: [],
                    monitoring: 'elk'
                })
                .on('end', done);
        });
        it('creates expected default files', function () {
            assert.file(expectedFiles.dockercompose);
        });
        it('creates expected elk files', function () {
            assert.file(expectedFiles.elk);
        });
        it('creates jhipster-registry content', function () {
            assert.fileContent('docker-compose.yml', /jhipster-registry:8761\/config/);
        });
        it('creates compose file without container_name, external_links, links', function () {
            assert.noFileContent('docker-compose.yml', /container_name:/);
            assert.noFileContent('docker-compose.yml', /external_links:/);
            assert.noFileContent('docker-compose.yml', /links:/);
        });
    });

    describe('monolith', function () {
        beforeEach(function (done) {
            helpers
                .run(require.resolve('../generators/docker-compose'))
                .inTmpDir(function (dir) {
                    fse.copySync(path.join(__dirname, './templates/compose/'), dir);
                })
                .withPrompts({
                    composeApplicationType: 'monolith',
                    directoryPath: './',
                    'chosenApps': [
                        '08-monolith'
                    ],
                    clusteredDbApps: [],
                    monitoring: 'elk'
                })
                .on('end', done);
        });
        it('creates expected default files', function() {
            assert.file(expectedFiles.monolith);
        });
        it('creates compose file without container_name, external_links, links', function () {
            assert.noFileContent('docker-compose.yml', /container_name:/);
            assert.noFileContent('docker-compose.yml', /external_links:/);
            assert.noFileContent('docker-compose.yml', /links:/);
        });
    });
});

exports.shouldBeV3DockerfileCompatible = function(databaseType) {
    it('creates compose file without container_name, external_links, links', function () {
        assert.noFileContent(DOCKER_DIR + 'app.yml', /container_name:/);
        assert.noFileContent(DOCKER_DIR + 'app.yml', /external_links:/);
        assert.noFileContent(DOCKER_DIR + 'app.yml', /links:/);
        assert.noFileContent(DOCKER_DIR + databaseType + '.yml', /container_name:/);
        assert.noFileContent(DOCKER_DIR + databaseType + '.yml', /external_links:/);
        assert.noFileContent(DOCKER_DIR + databaseType + '.yml', /links:/);
    });
};

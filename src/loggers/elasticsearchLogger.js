/**
 * Elasticsearch Logger
 */
const _ = require('lodash');
const BunyanElasticSearch = require('bunyan-stream-elasticsearch');

function elasticsearchLogger(config, logLevel) {
    let elasticsearchConfig = {
        active: false,
        level: "debug",
        host: "http://localhost:9200",
        indexPattern: "[mep2_logs-]YYYY-MM-DD",
        type: "log"
    };

    if (config && !config.indexPattern) {
        elasticsearchConfig.index = "mep2_logs";
    }

    if (config) {
        elasticsearchConfig = _.defaults(config, elasticsearchConfig)
    }


    if (elasticsearchConfig.active === true) {
        return {
            level: logLevel,
            stream: new BunyanElasticSearch({
                index: elasticsearchConfig.index,
                indexPattern: elasticsearchConfig.indexPattern,
                type: elasticsearchConfig.type,
                host: elasticsearchConfig.host
            })
        };
    }

    return undefined;
}

module.exports = elasticsearchLogger;
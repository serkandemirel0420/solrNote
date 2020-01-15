<template>
    <div id="wrapper">
        <main>
            <div>
                hey there
            </div>
        </main>
    </div>
</template>

<script>

    // Require module
    var SolrNode = require('solr-node');

    // Create client
    var client = new SolrNode({
        host: '127.0.0.1',
        port: '8983',
        core: 'solrNote',
        protocol: 'http'
    });

    //jquery load
    var $ = require("jquery");
    window.$ = require("jquery");
    window.JQuery = require("jquery");
    //jquery load

    export default {
        name: 'landing-page',
        components: {},
        data() {
            return {
                content: null,
                result : []
            }
        },
        methods: {
            open(link) {
                this.$electron.shell.openExternal(link)
            },
            htmlContent() {
                return this.content;
            },
            rawContent() {
                return this.content.replace(/<[^>]+>|&nbsp;/g, "").replace(/\s{2,}/, " ");
            },
        },
        computed: {},
        watch: {}
    }
</script>

<style>
    @import url('https://fonts.googleapis.com/css?family=Source+Sans+Pro');

    * {
        box-sizing: border-box;
        margin: 0;
        padding: 0;
    }

    body {
        font-family: 'Source Sans Pro', sans-serif;
    }


    main {
        display: flex;
        justify-content: space-between;
    }


</style>

<template>
    <div id="wrapper">
        <div id="info" class="flex">
            <div class="result flex">
                <span>Result :</span>
                <span v-if="true">10</span>
            </div>

            <div class="index flex">
                <span v-if="true">0</span>
                <span> / </span>
                <span>10</span>
            </div>
        </div>
        <input
                id="filter"
                type="text"
                v-on:keydown="keydownPrevent"
                v-on:keydown.up="iterateUp"
                v-on:keydown.down="iterateDown"
                v-model="filterText"
        />

        <editor
                id="editor"
                v-model="content"
                api-key="xluuxt70fff5jeyswtbg406oeydfhkhvf5r7i32u40qeauur"
                :init="init"
        ></editor>
        <div class="buttons">
            <button @click="addData" class="button">Submit</button>
            <button @click="updateData" class="button">Update</button>
            <button @click="deleteData" class="button">Delete</button>
        </div>


        <div id="resultAread">

        </div>
    </div>
</template>

<script>

    import Editor from "@tinymce/tinymce-vue";

    // Require module
    var SolrNode = require('solr-node');

    // Create client
    var solrClient = new SolrNode({
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
        components: {
            editor: Editor
        },
        data() {
            return {
                content: null,
                result: [],
                filterText: "",
                init: {
                    plugins:
                        "advlist autolink lists link image imagetools charmap print preview hr anchor pagebreak searchreplace wordcount visualblocks visualchars code  media nonbreaking save table contextmenu directionality emoticons template paste textcolor colorpicker textpattern",
                    paste_data_images: true,
                    menubar: true,
                    statusbar: false,
                    extended_valid_elements: "+@[data-src]"
                }

            }
        },
        async mounted() {
            try {
                let query = {text: 's',};
                const result = await solrClient.search(query);
                console.log('Response:', result.response);
            } catch (err) {
                console.error(err);
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
            iterateUp() {

            },
            iteratedown() {

            },
            keydownPrevent(event) {
                if (event.which === 38 || event.which === 40) {
                    event.preventDefault();
                }
            },
            fileUpload(data) {
                let fs = require("fs");

                try {
                    var name =
                        Math.random()
                            .toString(36)
                            .substring(2) + Date.now().toString(36);
                    fs.writeFileSync(
                        "/Users/serkan/Dropbox/" + name + ".png",
                        data.split(";base64,").pop(),
                        { encoding: "base64" }
                    );
                    return "http://localhost:9191/static/" + name + ".png";
                } catch (e) {
                    console.log("errrrrrr");
                }
            },
            async addData() {

                debugger
                var rawHTML = this.content;
                var $div = $("<div>").html(rawHTML);

                //loop, upload, replace attributes
                $div.find("img").each((index, img) => {
                    var data = img.src;
                    if (img.src.startsWith("data:image")) {
                        var url = this.fileUpload(data);
                        $(img).attr("src", url);
                        $(img).removeAttr("id");
                    }
                });

                this.content = $($div).prop("outerHTML");


                let data = {content: this.rawContent(), content_html: this.content, tags: []};



                try{
                    // JSON Data
                    // let data = {
                    //     content: 'jason',
                    //     content_html: 'state',
                    //     tag: ["empty"],
                    // };

                    // Update document to Solr server
                    let result = await solrClient.update(data);
                    let result2 = await solrClient.commit();
                    console.log("done");


                }catch (err) {
                    console.log(err)
                }

            },
            updateData() {

            },
            deleteData() {

            }
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

    .flex {
        display: flex;
    }

    main {
        display: flex;
        justify-content: space-between;
    }

    #wrapper {
        height: 100vh;
        padding: 25px 80px;
        width: 100vw;
    }

    div#info {
        justify-content: space-between;
        padding: 4px;
    }

    input#filter {
        padding: 8px;
        font-size: 120%;
        margin-bottom: 10px;
        width: 100%;
    }

    button.button {
        padding: 9px 15px;
        margin-right: 18px;
        float: left;
        margin-top: 10px;
        background: whitesmoke;
        border: 1px solid gainsboro;
        cursor: pointer;
    }


</style>

<template>
    <v-layout justify-center>
        <v-dialog v-model="dialogMap" persistent width="732">
            <v-card>
                <v-card-title>
                    <span class="headline">Rejoignez-nous</span>
                </v-card-title>
                <v-card-text>
                    <div style="overflow:hidden;width: 700px;position: relative;">
                        <iframe width="700" height="440"
                                src="https://maps.google.com/maps?width=700&amp;height=440&amp;hl=en&amp;q=Eulmont+(Rejoignez-nous)&amp;ie=UTF8&amp;t=&amp;z=10&amp;iwloc=B&amp;output=embed"
                                frameborder="0" scrolling="no" marginheight="0" marginwidth="0">
                        </iframe>
                        <div style="position: absolute;width: 80%;bottom: 10px;left: 0;right: 0;margin-left: auto;margin-right: auto;color: #000;text-align: center;">
                            <small style="line-height: 1.8;font-size: 2px;background: #fff;">Powered by <a
                                    href="https://embedgooglemaps.com/es/">Embedgooglemaps ES</a> & <a
                                    href="https://dnatestafkomstvergelijken.nl/">dna test afkomst gratis</a>
                            </small>
                        </div>
                    </div>
                    <br/>
                </v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-flex>
                        <v-btn small color="error" @click="closeModale">Fermer</v-btn>
                    </v-flex>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </v-layout>
</template>

<script>
    export default {
        name: "Rejoindre.vue",
        props: {
            dialogMap: {
                type: Boolean,
                default: false
            }
        },
        methods: {
            closeModale() {
                this.dialogMap = false;
            }
        }
    }
</script>

<style>
    #gmap_canvas img {
        max-width: none !important;
        background: none !important
    }
</style>
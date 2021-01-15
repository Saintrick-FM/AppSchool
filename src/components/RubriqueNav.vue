<template lang="">
  <div>
    <v-container class="grey lighten-5">
      <v-row no-gutters>
        <v-col>
          <v-card class="pa-2" outlined tile>
            <v-hover>
              <template v-slot:default="{ hover }">
                <v-card max-width="auto">
                  <v-avatar color="indigo">
                    <v-icon dark>
                      mdi-account-circle
                    </v-icon>
                  </v-avatar>

                  <h4>Inscription</h4>
                  <v-fade-transition>
                    <v-overlay v-if="hover" absolute color="#036358">
                      <v-btn route to="/login">Cliquez</v-btn>
                    </v-overlay>
                  </v-fade-transition>
                </v-card> 
              </template>
            </v-hover>
          </v-card> 
        </v-col>
        <v-col order="12">
          <v-card class="pa-2" outlined tile>
            <v-hover>
              <template v-slot:default="{ hover }">
                <v-card max-width="auto">
                  <v-avatar color="indigo">
                    <v-icon dark>
                      mdi-account-circle
                    </v-icon>
                  </v-avatar>
                  <h4>Finances</h4>
                  <v-fade-transition>
                    <v-overlay v-if="hover" absolute color="#036358">
                      <v-btn route to="/">Cliquez</v-btn>
                    </v-overlay>
                  </v-fade-transition>
                </v-card>
              </template>
            </v-hover>
          </v-card>
        </v-col>
      </v-row>
      <v-row no-gutters>
        <v-col>
          <v-card class="pa-2" outlined tile>
            <v-card class="pa-2" outlined tile>
              <v-hover>
                <template v-slot:default="{ hover }">
                  <v-card max-width="auto">
                    <v-avatar color="indigo">
                      <v-icon dark>
                        mdi-account-circle
                      </v-icon>
                    </v-avatar>
                    <h4>Pédagogie</h4>
                    <v-fade-transition>
                      <v-overlay v-if="hover" absolute color="#036358">
                        <v-btn>Cliquez</v-btn>
                      </v-overlay>
                    </v-fade-transition>
                  </v-card>
                </template>
              </v-hover>
            </v-card>
          </v-card>
        </v-col>
        <v-col order="12">
          <v-card class="pa-2" outlined tile>
            <v-card class="pa-2" outlined tile>
              <v-hover>
                <template v-slot:default="{ hover }">
                  <v-card max-width="auto">
                    <v-avatar color="indigo">
                      <v-icon dark>
                        mdi-account-circle
                      </v-icon>
                    </v-avatar>
                    <h4>Classes</h4>
                    <v-fade-transition>
                      <v-overlay v-if="hover" absolute color="#036358">
                        <v-btn>Cliquez</v-btn>
                      </v-overlay>
                    </v-fade-transition>
                  </v-card>
                </template>
              </v-hover>
            </v-card>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>
<script>
export default {
  name: "RubriqueNav",
};
</script>
<style lang=""></style>

<script setup lang="ts">
import {useAuthStore} from "@/stores/auth";
import {useForm} from "vee-validate";
import * as yup from 'yup'
import type {LoginInput} from "@/interface";

const authStore = useAuthStore()

const {errors, handleSubmit, defineField} = useForm({
  validationSchema: yup.object({
    email: yup.string().email().required().label('Email'),
    password: yup.string().required().label('Password'),
  }),
});

const [email, emailAttrs] = defineField('email');
const [password, passwordAttrs] = defineField('password');

// Creates a submission handler.
const onSubmit = handleSubmit(async (values: LoginInput) => {
  await authStore.login(values)
});
</script>

<template>
  <section class="vh-100" style="background-color: #f7d450;">
    <div class="container py-5 h-100">
      <div class="row d-flex justify-content-center align-items-center h-100">
        <div class="col-7 col-xl-4">
          <div class="card" style="border-radius: 1rem;">
            <div class="row g-0">
              <div class="col d-flex align-items-center">
                <div class="card-body p-4 p-lg-5 text-black">
                  <form @submit.prevent="onSubmit">
                    <div class="d-flex align-items-center mb-3 pb-1">
                      <h1>Login</h1>
                    </div>

                    <div class="alert alert-danger" role="alert" v-if="authStore.errorMessage">{{
                        authStore.errorMessage
                      }}
                    </div>

                    <div data-mdb-input-init class="form-outline mb-4">
                      <label class="form-label">Email</label>
                      <input name="email" v-model="email" v-bind="emailAttrs" type="email"
                             class="form-control form-control-lg"/>
                      <p class="text-danger">{{ errors.email }}</p>
                    </div>

                    <div data-mdb-input-init class="form-outline mb-4">
                      <label class="form-label">Password</label>
                      <input name="password" v-model="password" v-bind="passwordAttrs" type="password"
                             class="form-control form-control-lg"/>
                      <p class="text-danger">{{ errors.password }}</p>
                    </div>

                    <div class="pt-1 mb-4">
                      <button class="btn btn-dark btn-lg btn-block" type="submit">Login</button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

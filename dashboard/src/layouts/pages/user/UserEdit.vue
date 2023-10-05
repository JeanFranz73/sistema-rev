<script>
import { mapState } from 'pinia'
import { useSessionStore } from '@/stores'

import { getAvatar } from '@/helpers'

export default {
    name: 'UserEdit',
    data: () => ({
        getAvatar,
        user: {}
    }),
    computed: {
        ...mapState(useSessionStore, ['getLoggedUser'])
    },
    mounted() {
        this.user = this.getLoggedUser
    },
}
</script>

<template>
    <div class="mb-9">
        <div class="row g-6">
            <div class="col-12 col-xl-4">
                <div class="card mb-5">
                    <div class="card-header hover-actions-trigger position-relative mb-6" style="min-height: 60px; ">
                        <div class="bg-holder rounded-top" style="background-image: linear-gradient(0deg, #00000044 -3%, rgba(0, 0, 0, 0) 83%)">
                        </div>
                        <div class="avatar avatar-4xl status-online feed-avatar-profile">
                            <img class="rounded-circle img-thumbnail bg-white shadow-sm" :src="getAvatar(user.email, 96)" width="200" alt="" />
                        </div>
                    </div>
                    <div class="card-body">
                        <div class="row">
                            <div class="col-12">
                                <div class="d-flex flex-wrap mb-2 align-items-center">
                                    <h3 class="me-2">{{ user.name }}</h3><span class="fw-normal fs-0">{{ user.username }}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="border-bottom border-dashed pb-3 mb-4">
                    <h5 class="text-900 mb-3">Who will be able to see your profile?</h5>
                    <div class="form-check">
                        <input class="form-check-input" id="onlyMe" type="radio" checked="checked" name="profiileVisibility" />
                        <label class="form-check-label fs-0" for="onlyMe">Only me</label>
                    </div>
                    <div class="form-check">
                        <input class="form-check-input" id="myFollowers" type="radio" name="profiileVisibility" />
                        <label class="form-check-label fs-0" for="myFollowers">My followers</label>
                    </div>
                    <div class="form-check">
                        <input class="form-check-input" id="everyone" type="radio" name="profiileVisibility" />
                        <label class="form-check-label fs-0" for="everyone">Everyone</label>
                    </div>
                </div>
                <div class="border-bottom border-dashed pb-3 mb-4">
                    <h5 class="text-900 mb-3">Who can tag you?</h5>
                    <div class="form-check">
                        <input class="form-check-input" id="tagGroupMembers" type="radio" checked="checked" name="tagPermission" />
                        <label class="form-check-label fs-0" for="tagGroupMembers">Group Members</label>
                    </div>
                    <div class="form-check">
                        <input class="form-check-input" id="tagEveryone" type="radio" name="tagPermission" />
                        <label class="form-check-label fs-0" for="tagEveryone">Everyone</label>
                    </div>
                </div>
                <div class="border-bottom border-dashed pb-3 mb-4">
                    <div class="form-check">
                        <input class="form-check-input" id="showEmail" type="checkbox" name="showEmail" />
                        <label class="form-check-label fs-0" for="showEmail">Allow users to show your email</label>
                    </div>
                    <div class="form-check">
                        <input class="form-check-input" id="showExperiences" type="checkbox" name="showExperiences" />
                        <label class="form-check-label fs-0" for="showExperiences">Allow users to show your experiences</label>
                    </div>
                    <div class="form-check">
                        <input class="form-check-input" id="showFollowers" type="checkbox" checked="checked" name="showFollowers" />
                        <label class="form-check-label fs-0" for="showFollowers">Allow users to show your followers</label>
                    </div>
                </div>
                <div class="mb-4">
                    <div class="form-check form-switch">
                        <input class="form-check-input" id="showPhone" type="checkbox" checked="checked" name="showPhone" />
                        <label class="form-check-label fs-0" for="showPhone">Show your phone number</label>
                    </div>
                    <div class="form-check form-switch">
                        <input class="form-check-input" id="permitFollow" type="checkbox" checked="checked" name="permitFollow" />
                        <label class="form-check-label fs-0" for="permitFollow">Permit users to follow you.</label>
                    </div>
                </div>
            </div>
            <div class="col-12 col-xl-8">
                <div class="border-bottom border-300 mb-4">
                    <div class="mb-6">
                        <h4 class="mb-4">Informações Pessoais</h4>
                        <div class="row g-3">
                            <div class="col-12 col-sm-6">
                                <div class="form-icon-container">
                                    <div class="form-floating">
                                        <input class="form-control form-icon-input" id="firstName" type="text" placeholder="Nome" />
                                        <label class="text-700 form-icon-label" for="firstName">Nome</label>
                                    </div>
                                    <icones type="user" class="text-900 fs--1 form-icon" />
                                </div>
                            </div>
                            <div class="col-12 col-sm-6">
                                <div class="form-icon-container">
                                    <div class="form-floating">
                                        <input class="form-control form-icon-input" id="lastName" type="text" placeholder="Sobrenome" />
                                        <label class="text-700 form-icon-label" for="lastName">Sobrenome</label>
                                    </div>
                                    <icones type="user" class="text-900 fs--1 form-icon" />
                                </div>
                            </div>
                            <div class="col-12 col-sm-6">
                                <div class="form-icon-container">
                                    <div class="form-floating">
                                        <input class="form-control form-icon-input" id="emailSocial" type="email" placeholder="E-mail" />
                                        <label class="text-700 form-icon-label" for="emailSocial">E-mail</label>
                                    </div>
                                    <icones type="mail" class="text-900 fs--1 form-icon" />
                                </div>
                            </div>
                            <div class="col-12 col-sm-6">
                                <div class="form-icon-container">
                                    <div class="form-floating">
                                        <input class="form-control form-icon-input" id="phone" type="tel" placeholder="Telefone" />
                                        <label class="text-700 form-icon-label" for="phone">Telefone</label>
                                    </div>
                                    <icones type="phone" class="text-900 fs--1 form-icon" />
                                </div>
                            </div>
                            <div class="col-12 col-sm-6">
                                <div class="form-icon-container">
                                    <div class="form-floating">
                                        <textarea class="form-control form-icon-input" id="info" style="height: 115px;" placeholder="Info"></textarea>
                                        <label class="text-700 form-icon-label" for="info">Info</label>
                                    </div>
                                    <icones type="info-circle" class="text-900 fs--1 form-icon" />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="row gx-3 mb-6 gy-6 gy-sm-3">
                        <div class="col-12 col-sm-6">
                            <h4 class="mb-4">Company Info</h4>
                            <div class="form-icon-container mb-3">
                                <div class="form-floating">
                                    <input class="form-control form-icon-input" id="companyName" type="text" placeholder="Company Name" />
                                    <label class="text-700 form-icon-label" for="companyName">COMPANY NAME</label>
                                </div>
                                <icones type="building" size="15" class="text-900 fs--1 form-icon" />
                            </div>
                            <div class="form-icon-container">
                                <div class="form-floating">
                                    <input class="form-control form-icon-input" id="website" type="text" placeholder="Website" />
                                    <label class="text-700 form-icon-label" for="website">Website</label>
                                </div>
                                <icones type="world" size="15" class="text-900 fs--1 form-icon" />
                            </div>
                        </div>
                        <div class="col-12 col-sm-6">
                            <h4 class="mb-4">Change Password</h4>
                            <div class="form-icon-container mb-3">
                                <div class="form-floating">
                                    <input class="form-control form-icon-input" id="oldPassword" type="password" placeholder="Senha antiga" />
                                    <label class="text-700 form-icon-label" for="oldPassword">Senha antiga</label>
                                </div>
                                <icones type="lock" size="15" class="text-900 fs--1 form-icon" />
                            </div>
                            <div class="form-icon-container mb-3">
                                <div class="form-floating">
                                    <input class="form-control form-icon-input" id="newPassword" type="password" placeholder="Nova senha" />
                                    <label class="text-700 form-icon-label" for="newPassword">Nova senha</label>
                                </div>
                                <icones type="key" size="15" class="text-900 fs--1 form-icon" />
                            </div>
                            <div class="form-icon-container">
                                <div class="form-floating">
                                    <input class="form-control form-icon-input" id="newPassword2" type="password" placeholder="Confirmar nova senha" />
                                    <label class="text-700 form-icon-label" for="newPassword2">Confirmar nova senha</label>
                                </div>
                                <icones type="key" size="15" class="text-900 fs--1 form-icon" />
                            </div>
                        </div>
                    </div>
                    <div class="text-end mb-6">
                        <div>
                            <button class="btn btn-snipe-secondary me-2">Cancel Changes</button>
                            <button class="btn btn-snipe-success">Save Information</button>
                        </div>
                    </div>
                </div>
                <div class="row gy-5">
                    <!-- <div class="col-12 col-md-6">
                        <h4 class="text-black">Transfer Ownership</h4>
                        <p class="text-700">Transfer this account to another person or to a company repository.</p>
                        <button class="btn btn-snipe-warning">Transfer</button>
                    </div> -->
                    <div class="col-12 col-md-6">
                        <h4 class="text-black">Inativar conta</h4>
                        <p class="text-700">Desativar o usuário e bloquear o acesso ao sistema</p>
                        <button class="btn btn-snipe-danger">Inativar conta</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
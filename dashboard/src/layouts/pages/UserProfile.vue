<script>
   export default {
   
   }
</script>
<template>
   <section class="pt-5 pb-9">
      <div class="container-small">
        <nav class="mb-2" aria-label="breadcrumb">
          <ol class="breadcrumb mb-0">
            <li class="breadcrumb-item"><a href="#!">Dashboard</a></li>
            <li class="breadcrumb-item active" aria-current="page">Usuário</li>
          </ol>
        </nav>
        <div class="row align-items-center justify-content-between g-3 mb-4">
          <div class="col-auto">
            <h2 class="mb-0">Perfil</h2>
          </div>
          <div class="col-auto">
            <div class="row g-2 g-sm-3">
              <div class="col-auto"><button class="btn btn-snipe-danger"><span class="fas fa-trash-alt me-2"></span>Inativar usuário</button></div>
              <div class="col-auto"><button class="btn btn-snipe-secondary"><span class="fas fa-key me-2"></span>Resetar Senha</button></div>
            </div>
          </div>
        </div>
        <div class="row g-3 mb-6">
          <div class="col-12 col-lg-8">
            <div class="card h-100">
              <div class="card-body">
                <div class="border-bottom border-dashed border-300 pb-4">
                  <div class="row align-items-center g-3 g-sm-5 text-center text-sm-start">
                     <div class="col-12 col-sm-auto"><input class="d-none" id="avatarFile" type="file" />
                        <label class="cursor-pointer avatar avatar-5xl" for="avatarFile">
                           <img class="rounded-circle" src="@/assets//img/profile.png" alt="" />
                        </label>
                     </div>
                     <div class="col-12 col-sm-auto flex-1">
                        <h3>Tengen</h3>
                        <p class="text-800">Joined 3 months ago</p>
                     </div>
                  </div>
                </div>
                <div class="d-flex flex-between-center pt-4">
                  <div>
                    <h6 class="mb-2 text-800">Total gasto</h6>
                    <h4 class="fs-1 text-1000 mb-0">$999999</h4>
                  </div>
                  <div class="text-end">
                    <h6 class="mb-2 text-800">Último pedido</h6>
                    <h4 class="fs-1 text-1000 mb-0">ontem</h4>
                  </div>
                  <div class="text-end">
                    <h6 class="mb-2 text-800">Total de pedidos</h6>
                    <h4 class="fs-1 text-1000 mb-0">30000</h4>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="col-12 col-lg-4">
            <div class="card h-100">
              <div class="card-body">
                <div class="border-bottom border-dashed border-300">
                  <h4 class="mb-3 lh-sm lh-xl-1">Endereço padrão<button class="btn btn-link p-0" type="button"></button></h4>
                </div>
                <div class="pt-4 mb-7 mb-lg-4 mb-xl-7">
                  <div class="row justify-content-between">
                    <div class="col-auto">
                      <h5 class="text-1000">Endereço</h5>
                    </div>
                    <div class="col-auto">
                      <p class="text-800">Desconhecido<br /></p>
                    </div>
                  </div>
                </div>
                <div class="border-top border-dashed border-300 pt-4">
                  <div class="row flex-between-center mb-2">
                    <div class="col-auto">
                      <h5 class="text-1000 mb-0">Email</h5>
                    </div>
                    <div class="col-auto"><a class="lh-1" href="mailto:shatinon@jeemail.com">tengen@gmail.com</a></div>
                  </div>
                  <div class="row flex-between-center">
                    <div class="col-auto">
                      <h5 class="text-1000 mb-0">Telefone</h5>
                    </div>
                    <div class="col-auto"><a href="tel:+1234567890">(51) 1234-56789</a></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div>
          <div class="scrollbar">
            <ul class="nav nav-underline flex-nowrap mb-3 pb-1" id="myTab" role="tablist">
              <li class="nav-item me-3"><a class="nav-link text-nowrap active" id="orders-tab" data-bs-toggle="tab" href="#tab-orders" role="tab" aria-controls="tab-orders" aria-selected="true"><span class="fas fa-shopping-cart me-2"></span>Pedidos <span class="text-700 fw-normal"> (30000)</span></a></li>
              <li class="nav-item"><a class="nav-link text-nowrap" id="personal-info-tab" data-bs-toggle="tab" href="#tab-personal-info" role="tab" aria-controls="tab-personal-info" aria-selected="true"><span class="fas fa-user me-2"></span>Informações pessoais</a></li>
            </ul>
          </div>
          <div class="tab-content" id="profileTabContent">
            <div class="tab-pane fade show active" id="tab-orders" role="tabpanel" aria-labelledby="orders-tab">
              <div class="border-top border-bottom border-200" id="profileOrdersTable" data-list='{"valueNames":["order","status","delivery","date","total"],"page":6,"pagination":true}'>
                <div class="table-responsive scrollbar">
                  <table class="table fs--1 mb-0">
                    <thead>
                      <tr>
                        <th class="sort white-space-nowrap align-middle pe-3 ps-0" scope="col" data-sort="order" style="width:15%; min-width:140px">Número do pedido</th>
                        <th class="sort align-middle pe-3" scope="col" data-sort="status" style="width:15%; min-width:180px">Status do pedido</th>
                        <th class="sort align-middle pe-0 text-end" scope="col" data-sort="date" style="width:15%; min-width:160px">Data</th>
                        <th class="sort align-middle text-end" scope="col" data-sort="total" style="width:15%; min-width:160px">Total</th>
                      </tr>
                    </thead>
                    <tbody class="list" id="profile-order-table-body">
                      <tr class="hover-actions-trigger btn-reveal-trigger position-static">
                        <td class="order align-middle white-space-nowrap py-2 ps-0"><a class="fw-semi-bold text-primary" href="#!">#2453</a></td>
                        <td class="status align-middle white-space-nowrap text-start fw-bold text-700 py-2">
                           <span class="badge badge-phoenix fs--2 badge-snipe-success">
                              <span class="text-700 text-end py-2">Entregue</span>
                           </span>
                        </td>
                        <td class="total align-middle text-700 text-end py-2">Dec 12, 12:56 PM</td>
                        <td class="date align-middle fw-semi-bold text-end py-2 text-1000">$87</td>
                      </tr>
                      <tr class="hover-actions-trigger btn-reveal-trigger position-static">
                        <td class="order align-middle white-space-nowrap py-2 ps-0"><a class="fw-semi-bold text-primary" href="#!">#2452</a></td>
                        <td class="status align-middle white-space-nowrap text-start fw-bold text-700 py-2"><span class="badge badge-phoenix fs--2 badge-snipe-info"><span class="text-700 text-end py-2">Pronto para entrega</span><span class="ms-1" data-feather="info" style="height:12.8px;width:12.8px;"></span></span></td>
                        <td class="total align-middle text-700 text-end py-2">Dec 9, 2:28PM</td>
                        <td class="date align-middle fw-semi-bold text-end py-2 text-1000">$7264</td>
                      </tr>
                      <tr class="hover-actions-trigger btn-reveal-trigger position-static">
                        <td class="order align-middle white-space-nowrap py-2 ps-0"><a class="fw-semi-bold text-primary" href="#!">#2451</a></td>
                        <td class="status align-middle white-space-nowrap text-start fw-bold text-700 py-2"><span class="badge badge-phoenix fs--2 badge-snipe-warning"><span class="text-700 text-end py-2">Perto da entrega</span><span class="ms-1" data-feather="clock" style="height:12.8px;width:12.8px;"></span></span></td>
                        <td class="total align-middle text-700 text-end py-2">Dec 4, 12:56 PM</td>
                        <td class="date align-middle fw-semi-bold text-end py-2 text-1000">$375</td>

                      </tr>
                      <tr class="hover-actions-trigger btn-reveal-trigger position-static">
                        <td class="order align-middle white-space-nowrap py-2 ps-0"><a class="fw-semi-bold text-primary" href="#!">#2450</a></td>
                        <td class="status align-middle white-space-nowrap text-start fw-bold text-700 py-2"><span class="badge badge-phoenix fs--2 badge-snipe-secondary"><span class="text-700 text-end py-2">Cancelado</span><span class="ms-1" data-feather="x" style="height:12.8px;width:12.8px;"></span></span></td>
                        <td class="total align-middle text-700 text-end py-2">Dec 1, 4:07 AM</td>
                        <td class="date align-middle fw-semi-bold text-end py-2 text-1000">$657</td>
                      </tr>
                      <tr class="hover-actions-trigger btn-reveal-trigger position-static">
                        <td class="order align-middle white-space-nowrap py-2 ps-0"><a class="fw-semi-bold text-primary" href="#!">#2449</a></td>
                        <td class="status align-middle white-space-nowrap text-start fw-bold text-700 py-2"><span class="badge badge-phoenix fs--2 badge-snipe-success"><span class="text-700 text-end py-2">Entregue</span><span class="ms-1" data-feather="check" style="height:12.8px;width:12.8px;"></span></span></td>
                        <td class="total align-middle text-700 text-end py-2">Nov 28, 7:28 PM</td>
                        <td class="date align-middle fw-semi-bold text-end py-2 text-1000">$9562</td>
                      </tr>
                      <tr class="hover-actions-trigger btn-reveal-trigger position-static">
                        <td class="order align-middle white-space-nowrap py-2 ps-0"><a class="fw-semi-bold text-primary" href="#!">#2448</a></td>
                        <td class="status align-middle white-space-nowrap text-start fw-bold text-700 py-2"><span class="badge badge-phoenix fs--2 badge-snipe-danger"><span class="text-700 text-end py-2">Não entregue</span><span class="ms-1" data-feather="check" style="height:12.8px;width:12.8px;"></span></span></td>
                        <td class="total align-middle text-700 text-end py-2">Nov 24, 10:16 AM</td>
                        <td class="date align-middle fw-semi-bold text-end py-2 text-1000">$256</td>
                      </tr>
                      <tr class="hover-actions-trigger btn-reveal-trigger position-static">
                        <td class="order align-middle white-space-nowrap py-2 ps-0"><a class="fw-semi-bold text-primary" href="#!">#2446</a></td>
                        <td class="status align-middle white-space-nowrap text-start fw-bold text-700 py-2"><span class="badge badge-phoenix fs--2 badge-snipe-success"><span class="text-700 text-end py-2">Entregue</span><span class="ms-1" data-feather="check" style="height:12.8px;width:12.8px;"></span></span></td>
                        <td class="total align-middle text-700 text-end py-2">Nov 12, 12:20 PM</td>
                        <td class="date align-middle fw-semi-bold text-end py-2 text-1000">$4116</td>
                      </tr>
                      <tr class="hover-actions-trigger btn-reveal-trigger position-static">
                        <td class="order align-middle white-space-nowrap py-2 ps-0"><a class="fw-semi-bold pointers-events-none text-decoration-none" href="#!">#2445</a></td>
                        <td class="status align-middle white-space-nowrap text-start fw-bold text-700 py-2"><span class="badge badge-phoenix fs--2 badge-snipe-success"><span class="text-700 text-end py-2">Entregue</span><span class="ms-1" data-feather="check" style="height:12.8px;width:12.8px;"></span></span></td>
                        <td class="total align-middle text-700 text-end py-2">Oct 19, 1:20 PM</td>
                        <td class="date align-middle fw-semi-bold text-end py-2 text-600">$4116</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <div class="row align-items-center justify-content-between py-2 pe-0 fs--1">
                  <div class="col-auto d-flex">
                    <p class="mb-0 d-none d-sm-block me-3 fw-semi-bold text-900" data-list-info="data-list-info"></p><a class="fw-semi-bold" href="#!" data-list-view="*">Ver todos<span class="fas fa-angle-right ms-1" data-fa-transform="down-1"></span></a><a class="fw-semi-bold d-none" href="#!" data-list-view="less">View Less<span class="fas fa-angle-right ms-1" data-fa-transform="down-1"></span></a>
                  </div>
                  <div class="col-auto d-flex"><button class="page-link" data-list-pagination="prev"><span class="fas fa-chevron-left"></span></button>
                    <ul class="mb-0 pagination"></ul><button class="page-link pe-0" data-list-pagination="next"><span class="fas fa-chevron-right"></span></button>
                  </div>
                </div>
              </div>
            </div>
            <div class="tab-pane fade" id="tab-personal-info" role="tabpanel" aria-labelledby="personal-info-tab">
              <div class="row g-3 mb-5">
                <div class="col-12 col-lg-6"><label class="form-label text-1000 fs-0 ps-0 text-capitalize lh-sm" for="fullName">Full name</label><input class="form-control" id="fullName" type="text" placeholder="Full name" /></div>
                <div class="col-12 col-lg-6"><label class="form-label text-1000 fs-0 ps-0 text-capitalize lh-sm" for="gender">Gender</label><select class="form-select" id="gender">
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="non-binary">Non-binary</option>
                    <option value="not-to-say">Prefer not to say</option>
                  </select></div>
                <div class="col-12 col-lg-6"><label class="form-label text-1000 fs-0 ps-0 text-capitalize lh-sm" for="email">Email</label><input class="form-control" id="email" type="text" placeholder="Email" /></div>
                <div class="col-12 col-lg-6">
                  <div class="row g-2 gy-lg-0"><label class="form-label text-1000 fs-0 ps-1 text-capitalize lh-sm mb-1">Date of birth</label>
                    <div class="col-6 col-sm-2 col-lg-3 col-xl-2"><select class="form-select" id="date">
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                        <option value="6">6</option>
                        <option value="7">7</option>
                        <option value="8">8</option>
                        <option value="9">9</option>
                        <option value="10">10</option>
                        <option value="11">11</option>
                        <option value="12">12</option>
                        <option value="13">13</option>
                        <option value="14">14</option>
                        <option value="15">15</option>
                        <option value="16">16</option>
                        <option value="17">17</option>
                        <option value="18">18</option>
                        <option value="19">19</option>
                        <option value="20">20</option>
                        <option value="21">21</option>
                        <option value="22">22</option>
                        <option value="23">23</option>
                        <option value="24">24</option>
                        <option value="25">25</option>
                        <option value="26">26</option>
                        <option value="27">27</option>
                        <option value="28">28</option>
                        <option value="29">29</option>
                        <option value="30">30</option>
                      </select></div>
                    <div class="col-6 col-sm-2 col-lg-3 col-xl-2"><select class="form-select" id="month">
                        <option value="Jan">Jan</option>
                        <option value="Feb">Feb</option>
                        <option value="Mar">Mar</option>
                        <option value="Apr">Apr</option>
                        <option value="May">May</option>
                        <option value="Jun">Jun</option>
                        <option value="Jul">Jul</option>
                        <option value="Aug">Aug</option>
                        <option value="Sep">Sep</option>
                        <option value="Oct">Oct</option>
                        <option value="Nov">Nov</option>
                        <option value="Dec">Dec</option>
                      </select></div>
                    <div class="col-12 col-sm-8 col-lg-6 col-xl-8"><select class="form-select" id="year">
                        <option value="1990">1990</option>
                        <option value="1991">1991</option>
                        <option value="1992">1992</option>
                        <option value="1993">1993</option>
                        <option value="1994">1994</option>
                        <option value="1995">1995</option>
                        <option value="1996">1996</option>
                        <option value="1997">1997</option>
                        <option value="1998">1998</option>
                        <option value="1999">1999</option>
                        <option value="2000">2000</option>
                        <option value="2001">2001</option>
                        <option value="2002">2002</option>
                        <option value="2003">2003</option>
                        <option value="2004">2004</option>
                        <option value="2005">2005</option>
                        <option value="2006">2006</option>
                        <option value="2007">2007</option>
                        <option value="2008">2008</option>
                        <option value="2009">2009</option>
                        <option value="2010">2010</option>
                        <option value="2011">2011</option>
                        <option value="2012">2012</option>
                        <option value="2013">2013</option>
                        <option value="2014">2014</option>
                        <option value="2015">2015</option>
                        <option value="2016">2016</option>
                        <option value="2017">2017</option>
                        <option value="2018">2018</option>
                        <option value="2019">2019</option>
                        <option value="2020">2020</option>
                        <option value="2021">2021</option>
                        <option value="2022">2022</option>
                      </select></div>
                  </div>
                </div>
                <div class="col-12 col-lg-6"><label class="form-label text-1000 fw-bold fs-0 ps-0 text-capitalize lh-sm" for="phone">Phone</label><input class="form-control" id="phone" type="text" placeholder="+1234567890" /></div>
                <div class="col-12 col-lg-6"><label class="form-label text-1000 fw-bold fs-0 ps-0 text-capitalize lh-sm" for="alternative_phone">Alternative phone</label><input class="form-control" id="alternative_phone" type="text" placeholder="+1234567890" /></div>
              </div>
              <div class="text-end"><button class="btn btn-primary px-7">Save changes</button></div>
            </div>
          </div>
        </div>
      </div><!-- end of .container-->
    </section><!-- <section> close ============================-->
    <!-- ============================================-->
</template>


<style lang="scss" scoped>

</style>
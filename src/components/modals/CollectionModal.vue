<template>
  <div
    class="modal fade"
    id="productModal"
    tabindex="-1"
    role="dialog"
    aria-labelledby="exampleModalLabel"
    aria-hidden="true"
    ref="modal"
  >
    <div class="modal-dialog modal-xl" role="document">
      <div class="modal-content border-0">
        <div class="modal-header bg-dark text-white">
          <h5 class="modal-title" id="exampleModalLabel">
            <span>收藏資訊</span>
          </h5>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div class="modal-body">
          <div class="row">
            <div class="col-md-4">
              <h3>收藏者</h3>
              <table class="table">
                <tbody>
                  <tr>
                    <th style="width: 100px">姓名</th>
                    <td></td>
                  </tr>
                  <tr>
                    <th>Email</th>
                    <td></td>
                  </tr>
                  <tr>
                    <th>電話</th>
                    <td></td>
                  </tr>
                  <tr>
                    <th>地址</th>
                    <td></td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div class="col-md-8">
              <h3>訂單細節</h3>
              <table class="table">
                <tbody>
                  <tr>
                    <th style="width: 100px">訂單編號</th>
                    <td></td>
                  </tr>
                  <tr>
                    <th>下單時間</th>
                    <td></td>
                  </tr>
                  <tr>
                    <th>付款時間</th>
                    <td>
                      <span> </span>
                      <span>時間不正確</span>
                    </td>
                  </tr>
                  <tr>
                    <th>付款狀態</th>
                    <td>
                      <strong class="text-success">已付款</strong>
                      <span class="text-muted">尚未付款</span>
                    </td>
                  </tr>
                  <tr>
                    <th>總金額</th>
                    <td></td>
                  </tr>
                </tbody>
              </table>
              <h3>選購商品</h3>
              <table class="table">
                <thead>
                  <tr></tr>
                </thead>
                <tbody>
                  <tr>
                    <th></th>
                    <td></td>
                    <td class="text-end"></td>
                  </tr>
                </tbody>
              </table>
              <div class="d-flex justify-content-end">
                <div class="form-check">
                  <input class="form-check-input" type="checkbox" value="" id="flexCheckDefault" />
                  <label class="form-check-label" for="flexCheckDefault">
                    <span>已付款</span>
                    <span>未付款</span>
                  </label>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-outline-secondary" data-bs-dismiss="modal">
            取消
          </button>
          <button type="button" class="btn btn-primary">修改付款狀態</button>
        </div>
      </div>
    </div>
  </div>
</template>

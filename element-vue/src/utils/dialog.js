// 询问框
export async function showDialog(content,that){
    return new Promise((resolve, reject) => {
        that.$confirm(content, '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
        }).then(() => {
            resolve()
        }).catch(() => {});
    })
}

//询问框带reject
export async function showDialogWithReject(content,that){
    return new Promise((resolve, reject) => {
        that.$confirm(content, '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
        }).then(() => {
            resolve()
        }).catch(() => {reject()});
    })
}
// 显示操作成功
export function showSuccess(content,that) {
    that.$message({
        type: 'success',
        message: content
    });
}
// 显示操作失败
export function showFail(content,that) {
    that.$message({
        type: 'info',
        message: content
    });
}

// 加载
export function showLoading(content,that) {
    return that.$loading({
        lock: true,
        text: content,
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.7)'
    })
}

// 关闭加载
export function closeLoading(loading) {
    loading.close()
}

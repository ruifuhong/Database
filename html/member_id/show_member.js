// 获取所有需要编辑的输入框和编辑按钮
const inputs = document.querySelectorAll('input[disabled][required]');
const editButtons = document.querySelectorAll('.edit-button');

// 为每个编辑按钮添加点击事件监听器
editButtons.forEach(function(button) {
  button.addEventListener('click', function() {
    // 找到当前编辑按钮对应的输入框
    const input = button.parentElement.previousElementSibling;
    
    // 将输入框的 disabled 属性设置为 false，required 属性设置为 true
    input.disabled = false;
    input.required = true;
    
    // 给输入框添加焦点
    input.focus();
  });
});

// 为每个输入框添加失去焦点事件监听器
inputs.forEach(function(input) {
  input.addEventListener('blur', function() {
    // 将输入框的 disabled 属性设置为 true，required 属性设置为 false
    input.disabled = true;
    input.required = false;
  });
});

/**
 * sortable
 */
const sortables = $('.sortable');
var orderClass = '';
sortables.on('click', function (event) {
  event.preventDefault();
  sortables.removeClass('asc desc');
  $(this).toggleClass('active');
  if (orderClass == 'desc' || orderClass == '') {
    $(this).addClass('asc');
    orderClass = 'asc';
  } else {
    $(this).addClass('desc');
    orderClass = 'desc';
  }

  var index = $(this).parent().index();
  var $table = $('.m-dataTable_tbody');
  var rows = $table.find('.m-dataTable_tbody-tr');
  var isSelected = $(this).hasClass('active');

  rows.sort((a, b) => {
    var x = $(a).find('.m-dataTable_tbody-td .txt').eq(index).text();
    var y = $(b).find('.m-dataTable_tbody-td .txt').eq(index).text();
    if(isSelected) {
      if(x < y) return -1;
      if(x > y) return 1;
      return 0;
    } else {
      if(x > y) return -1;
      if(x < y) return 1;
      return 0;
    }
  })

  $.each(rows, function(index,row) {
    $table.append(row);
  });

  return false;
})

/**
 * animation drag drop
 */


/**
 * tab change
 */

$('.m-formBuilder_field-tab a').on('click', function (e) {
  e.preventDefault();
  const target = $(this).attr('data-content');
  $('.m-formBuilder_field-tab a').removeClass('active');
  $(this).addClass('active');
  $('.m-formBuilder_field-add, .m-formBuilder_field-option').hide();
  $('.m-formBuilder_field-' + target).show();
})

/**
 * drag item
 */

const draggables = document.querySelectorAll('.m-formBuilder_field-add--list li');
const formContent = document.querySelector('.m-formBuilder_form-content');
const fieldContent = document.querySelector('.m-formBuilder_field-option');
var dataType = '';

formContent.addEventListener('dragover', dragOver)
formContent.addEventListener('drop', dragDrop)

draggables.forEach(draggable => {
  draggable.addEventListener('dragstart', function (event) {
    this.classList.add('dragging')
    dataType = this.getAttribute('data-type')
    event.dataTransfer.setData("action", "createForm");
  })
  draggable.addEventListener('dragend', function () {
    this.classList.remove('dragging')
  })
})

function dragOver(event) {
  event.preventDefault()
  const afterElement = getDragAfterElement(formContent, event.clientY)
  const dragform = document.querySelector('.dragform');
  if (dragform) {
    if (afterElement == null) {
      formContent.appendChild(dragform)
    } else {
      formContent.insertBefore(dragform, afterElement)
    }
  }
}

function dragDrop(event) {
  var action = event.dataTransfer.getData("action");
  if (action == 'createForm') {
    dropItems(dataType, 'add')
    dragStartFormItem()
  }
}

function dragStartFormItem() {
  const dragFormItem = document.querySelectorAll('.m-formBuilder_form-content li');
  dragFormItem.forEach(draggable => {
    draggable.addEventListener('dragstart', function (event) {
      this.classList.add('dragform')
      event.dataTransfer.setData("action", "sortForm");
    })
    draggable.addEventListener('dragend', function () {
      this.classList.remove('dragform')
    })
  })
}

function setAttributes(element, attributes) {
  Object.keys(attributes).forEach(attr => {
    element.setAttribute(attr, attributes[attr]);
  });
}

function guidGenerator() {
  var S4 = function () {
    return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
  };
  return (S4() + S4() + "-" + S4() + "-" + S4() + "-" + S4() + "-" + S4() + S4() + S4());
}

function nameGenerator(length) {
  var result = '';
  var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  var charactersLength = characters.length;
  for (var i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}

function dropItems(dataType, control) {
  let formItemLi = document.createElement('li')
  let fieldItemLi = document.createElement('li')
  let uuid = guidGenerator();

  // setAttributes common
  setAttributes(formItemLi, {
    'data-field': uuid,
    'draggable': true,
  })

  const formName = `
  <div class="m-formBuilder_form-control">
    <button class="btn trans clone"></button>
    <button class="btn trans delete"></button>
  </div>
  <div class="m-formBuilder_form-item double row">
    <div class="m-input first_name col-6"><span class="m-input_label">
    <span>First name</span><small class="warning">*</small></span>
      <div class="input-area">
        <input class="input input-text" type="text" placeholder="First name">
      </div>
    </div>
    <div class="m-input last_name col-6"><span class="m-input_label">
    <span>Last name</span><small class="warning">*</small></span>
      <div class="input-area">
        <input class="input input-text" type="text" placeholder="Last name">
      </div>
    </div>
  </div>
`;

  const fieldName = `
  <div class="m-formBuilder_field-option-title">Name</div>
  <div class="m-input">
    <span class="m-input_label">Format</span>
    <div class="input-area">
      <select class="input select-box" name="select">
        <option value="first_name" selected="">First name</option>
        <option value="last_name">Last name</option>
      </select>
    </div>
  </div>
  <div class="m-input">
    <div class="required">
      <div>
        <input class="input-checkbox" id="${uuid}" type="checkbox">
        <label class="checkbox-label" for="${uuid}">Toggle</label>
      </div>
      <span>Required</span>
      <button class="btn-tooltip" type="button" data-toggle="tooltip" data-placement="top" title=""
        data-original-title="Tooltip on top"></button>
    </div>
  </div>
`;

  const formEmail = `
  <div class="m-formBuilder_form-control">
    <button class="btn trans clone"></button>
    <button class="btn trans delete"></button>
  </div>
  <div class="m-formBuilder_form-item">
    <div class="m-input"><span class="m-input_label">
    <span>Email</span><small class="warning">*</small></span>
      <div class="input-area">
        <input class="input input-text" type="email" placeholder="Enter email ID of speaker">
      </div>
    </div>
  </div>
`;

  const fieldEmail = `
  <div class="m-formBuilder_field-option-title">Email</div>
  <div class="m-input">
    <span class="m-input_label">Label</span>
    <div class="input-area">
      <input class="input input-text" type="email" value="Email" disabled="">
    </div>
  </div>
  <div class="m-input">
    <div class="required">
      <div>
        <input class="input-checkbox" id="${uuid}" type="checkbox">
        <label class="checkbox-label" for="${uuid}">Toggle</label>
      </div><span>Required</span>
      <button class="btn-tooltip" type="button" data-toggle="tooltip" data-placement="top" title=""
        data-original-title="Tooltip on top"></button>
    </div>
  </div>
`;

  const formJobTitle = `
  <div class="m-formBuilder_form-control">
    <button class="btn trans clone"></button>
    <button class="btn trans delete"></button>
  </div>
  <div class="m-formBuilder_form-item">
    <div class="m-input m-input_counter js-counter"><span class="m-input_label">
    <span>Job Title</span><small class="warning">*</small></span>
      <div class="input-area">
        <input class="input input-text" type="text" maxlength="50" placeholder="Enter speaker’s job title">
        <div class="counter"><span class="count-up">0</span>/<span class="count-max">50</span></div>
      </div>
    </div>
  </div>
`;

  const fieldJobTitle = `
  <div class="m-formBuilder_field-option-title">Job Title</div>
  <div class="m-input">
    <span class="m-input_label">Label</span>
    <div class="input-area">
      <input class="input input-text" type="text" value="Job Title" disabled="">
    </div>
  </div>
  <div class="m-input">
    <div class="required">
      <div>
        <input class="input-checkbox" id="${uuid}" type="checkbox">
        <label class="checkbox-label" for="${uuid}">Toggle</label>
      </div><span>Required</span>
      <button class="btn-tooltip" type="button" data-toggle="tooltip" data-placement="top" title=""
        data-original-title="Tooltip on top"></button>
    </div>
  </div>
`;

  const formOrganization = `
  <div class="m-formBuilder_form-control">
    <button class="btn trans clone"></button>
    <button class="btn trans delete"></button>
  </div>
  <div class="m-formBuilder_form-item">
    <div class="m-input m-input_counter js-counter"><span class="m-input_label">
    <span>Organization</span><small class="warning">*</small></span>
      <div class="input-area">
        <input class="input input-text" type="text" maxlength="50" placeholder="Enter speaker’s organization">
        <div class="counter"><span class="count-up">0</span>/<span class="count-max">50</span></div>
      </div>
    </div>
  </div>
`;

  const fieldOrganization = `
  <div class="m-formBuilder_field-option-title">Organization</div>
  <div class="m-input">
    <span class="m-input_label">Label</span>
    <div class="input-area">
      <input class="input input-text" type="text" value="Organization" disabled="">
    </div>
  </div>
  <div class="m-input">
    <div class="required">
      <div>
        <input class="input-checkbox" id="${uuid}" type="checkbox">
        <label class="checkbox-label" for="${uuid}">Toggle</label>
      </div><span>Required</span>
      <button class="btn-tooltip" type="button" data-toggle="tooltip" data-placement="top" title=""
        data-original-title="Tooltip on top"></button>
    </div>
  </div>
`;

  const formCountry = `
  <div class="m-formBuilder_form-control">
    <button class="btn trans clone"></button>
    <button class="btn trans delete"></button>
  </div>
  <div class="m-formBuilder_form-item">
    <div class="m-input"><span class="m-input_label">
    <span>Country</span><small class="warning">*</small></span>
      <div class="input-area">
        <input class="input input-text" type="text" placeholder="">
      </div>
    </div>
  </div>
`;

  const fieldCountry = `
  <div class="m-formBuilder_field-option-title">Country</div>
  <div class="m-input">
    <span class="m-input_label">Label</span>
    <div class="input-area">
      <input class="input input-text" type="text" value="Country" disabled="">
    </div>
  </div>
  <div class="m-input">
    <div class="required">
      <div>
        <input class="input-checkbox" id="${uuid}" type="checkbox">
        <label class="checkbox-label" for="${uuid}">Toggle</label>
      </div><span>Required</span>
      <button class="btn-tooltip" type="button" data-toggle="tooltip" data-placement="top" title=""
        data-original-title="Tooltip on top"></button>
    </div>
  </div>
`;

  const formProvinceCity = `
  <div class="m-formBuilder_form-control">
    <button class="btn trans clone"></button>
    <button class="btn trans delete"></button>
  </div>
  <div class="m-formBuilder_form-item">
    <div class="m-input"><span class="m-input_label">
    <span>Province/City</span><small class="warning">*</small></span>
      <div class="input-area">
        <input class="input input-text" type="text" placeholder="Enter speaker’s Province/City">
      </div>
    </div>
  </div>
`;

  const fieldProvinceCity = `
  <div class="m-formBuilder_field-option-title">Province/City</div>
  <div class="m-input">
    <span class="m-input_label">Label</span>
    <div class="input-area">
      <input class="input input-text" type="text" value="Province/City" disabled="">
    </div>
  </div>
  <div class="m-input">
    <div class="required">
      <div>
        <input class="input-checkbox" id="${uuid}" type="checkbox">
        <label class="checkbox-label" for="${uuid}">Toggle</label>
      </div><span>Required</span>
      <button class="btn-tooltip" type="button" data-toggle="tooltip" data-placement="top" title=""
        data-original-title="Tooltip on top"></button>
    </div>
  </div>
`;

  const formUploadAvatar = `
  <div class="m-formBuilder_form-control">
    <button class="btn trans clone"></button>
    <button class="btn trans delete"></button>
  </div>
  <div class="m-formBuilder_form-item">
    <div class="m-input"><span class="m-input_label">
    <span>Upload Avatar</span><small class="warning">*</small></span>
      <div class="input-file-wrap">
        <input class="input-file" type="file" name="" accept="image/png, image/jpeg, image/svg+xml"><img class="img-upload" src="" alt="your image">
        <div class="btn-upload"><img src="./assets/images/btn_upload.png" alt="Click or drop image"></div>
        <div class="btn-update"><img src="./assets/images/ico_up.svg" alt="Click or drop image"><span>Upload image</span></div>
        <div class="btn-remove"><img src="./assets/images/ico_trash.svg" alt="Click or drop image"><span>Remove image</span></div>
        <p>Recommended format: 480x480px | JPG, SVG, PNG | Up to 5 MB</p>
      </div>
    </div>
  </div>
`;

  const fieldUploadAvatar = `
  <div class="m-formBuilder_field-option-title">Upload Avatar</div>
  <div class="m-input">
    <span class="m-input_label">Label</span>
    <div class="input-area">
      <input class="input input-text" type="text" value="Upload Avatar" disabled="">
    </div>
  </div>
  <div class="m-input">
    <div class="required">
      <div>
        <input class="input-checkbox" id="${uuid}" type="checkbox">
        <label class="checkbox-label" for="${uuid}">Toggle</label>
      </div><span>Required</span>
      <button class="btn-tooltip" type="button" data-toggle="tooltip" data-placement="top" title=""
        data-original-title="Tooltip on top"></button>
    </div>
  </div>
`

  const formLineText = `
  <div class="m-formBuilder_form-control">
    <button class="btn trans clone"></button>
    <button class="btn trans delete"></button>
  </div>
  <div class="m-formBuilder_form-item">
    <div class="m-input"><span class="m-input_label">
    <span>Line text</span><small class="warning">*</small></span>
      <div class="input-area">
        <input class="input input-text" type="text" placeholder="">
      </div>
    </div>
  </div>
`;

  const fieldLineText = `
  <div class="m-formBuilder_field-option-title">Line text</div>
  <div class="m-input">
    <span class="m-input_label">Label</span>
    <div class="input-area">
      <input class="input input-text" type="text" value="Line text">
    </div>
  </div>
  <div class="m-input">
    <div class="required">
      <div>
        <input class="input-checkbox" id="${uuid}" type="checkbox">
        <label class="checkbox-label" for="${uuid}">Toggle</label>
      </div><span>Required</span>
      <button class="btn-tooltip" type="button" data-toggle="tooltip" data-placement="top" title=""
        data-original-title="Tooltip on top"></button>
    </div>
  </div>
`;

  const formParagraph = `
  <div class="m-formBuilder_form-control">
    <button class="btn trans clone"></button>
    <button class="btn trans delete"></button>
  </div>
  <div class="m-formBuilder_form-item">
    <div class="m-input"><span class="m-input_label">
    <span>Paragraph</span><small class="warning">*</small></span>
      <div class="input-area">
        <textarea class="input input-text input-textarea" name="" maxlength="1000" cols="30" rows="10"></textarea>
      </div>
    </div>
  </div>
`;

  const fieldParagraph = `
  <div class="m-formBuilder_field-option-title">Paragraph</div>
  <div class="m-input">
    <span class="m-input_label">Label</span>
    <div class="input-area">
      <input class="input input-text" type="text" value="Paragraph">
    </div>
  </div>
  <div class="m-input">
    <div class="required">
      <div>
        <input class="input-checkbox" id="${uuid}" type="checkbox">
        <label class="checkbox-label" for="${uuid}">Toggle</label>
      </div><span>Required</span>
      <button class="btn-tooltip" type="button" data-toggle="tooltip" data-placement="top" title=""
        data-original-title="Tooltip on top"></button>
    </div>
  </div>
`;

  const formDropdown = `
  <div class="m-formBuilder_form-control">
    <button class="btn trans clone"></button>
    <button class="btn trans delete"></button>
  </div>
  <div class="m-formBuilder_form-item">
    <div class="m-input"><span class="m-input_label">
    <span>Dropdown</span><small class="warning">*</small></span>
      <div class="input-area">
        <select class="input select-box"></select>
      </div>
    </div>
  </div>
`;

  const fieldDropdown = `
  <div class="m-formBuilder_field-option-title">Dropdown</div>
  <div class="m-input">
    <span class="m-input_label">Label</span>
    <div class="input-area">
      <input class="input input-text" type="text" value="Dropdown">
    </div>
  </div>
  <div class="m-input m-choice">
    <span class="m-input_label">Choice</span>
    <div class="input-area">
      <ul class="m-choice_list">
        <li>
          <input class="input input-text" type="text" value="First choice">
          <button class="btn btn-noborder trans plus" type="button"></button>
          <button class="btn btn-noborder trans minus" type="button"></button>
        </li>
        <li>
          <input class="input input-text" type="text" value="Second choice">
          <button class="btn btn-noborder trans plus" type="button"></button>
          <button class="btn btn-noborder trans minus" type="button"></button>
        </li>
        <li>
          <input class="input input-text" type="text" value="Third choice">
          <button class="btn btn-noborder trans plus" type="button"></button>
          <button class="btn btn-noborder trans minus" type="button"></button>
        </li>
      </ul>
    </div>
  </div>
  <div class="m-input">
    <div class="required">
      <div>
        <input class="input-checkbox" id="${uuid}" type="checkbox">
        <label class="checkbox-label" for="${uuid}">Toggle</label>
      </div><span>Required</span>
      <button class="btn-tooltip" type="button" data-toggle="tooltip" data-placement="top" title=""
        data-original-title="Tooltip on top"></button>
    </div>
  </div>
`;

  const formMultiChoice = `
  <div class="m-formBuilder_form-control">
    <button class="btn trans clone"></button>
    <button class="btn trans delete"></button>
  </div>
  <div class="m-formBuilder_form-item">
    <div class="m-input"><span class="m-input_label">
    <span>Multi choice</span><small class="warning">*</small></span>
      <div class="input-area radio-box"></div>
    </div>
  </div>
`;

  const fieldMultiChoice = `
  <div class="m-formBuilder_field-option-title">Multi choice</div>
  <div class="m-input">
    <span class="m-input_label">Label</span>
    <div class="input-area">
      <input class="input input-text" type="text" value="Multi choice">
    </div>
  </div>
  <div class="m-input m-choice">
    <span class="m-input_label">Choice</span>
    <div class="input-area">
      <ul class="m-choice_list">
        <li>
          <input class="input input-text" type="text" value="First choice">
          <button class="btn btn-noborder trans plus" type="button"></button>
          <button class="btn btn-noborder trans minus" type="button"></button>
        </li>
        <li>
          <input class="input input-text" type="text" value="Second choice">
          <button class="btn btn-noborder trans plus" type="button"></button>
          <button class="btn btn-noborder trans minus" type="button"></button>
        </li>
        <li>
          <input class="input input-text" type="text" value="Third choice">
          <button class="btn btn-noborder trans plus" type="button"></button>
          <button class="btn btn-noborder trans minus" type="button"></button>
        </li>
      </ul>
    </div>
  </div>
  <div class="m-input">
    <div class="required">
      <div>
        <input class="input-checkbox" id="${uuid}" type="checkbox">
        <label class="checkbox-label" for="${uuid}">Toggle</label>
      </div><span>Required</span>
      <button class="btn-tooltip" type="button" data-toggle="tooltip" data-placement="top" title=""
        data-original-title="Tooltip on top"></button>
    </div>
  </div>
`;

  const formCheckboxes = `
  <div class="m-formBuilder_form-control">
    <button class="btn trans clone"></button>
    <button class="btn trans delete"></button>
  </div>
  <div class="m-formBuilder_form-item">
    <div class="m-input"><span class="m-input_label">
    <span>Checkboxes</span><small class="warning">*</small></span>
      <div class="input-area checkbox-box"></div>
    </div>
  </div>
`;

  const fieldCheckboxes = `
  <div class="m-formBuilder_field-option-title">Checkboxes</div>
  <div class="m-input">
    <span class="m-input_label">Label</span>
    <div class="input-area">
      <input class="input input-text" type="text" value="Checkboxes">
    </div>
  </div>
  <div class="m-input m-choice">
    <span class="m-input_label">Choice</span>
    <div class="input-area">
      <ul class="m-choice_list">
        <li>
          <input class="input input-text" type="text" value="First choice">
          <button class="btn btn-noborder trans plus" type="button"></button>
          <button class="btn btn-noborder trans minus" type="button"></button>
        </li>
        <li>
          <input class="input input-text" type="text" value="Second choice">
          <button class="btn btn-noborder trans plus" type="button"></button>
          <button class="btn btn-noborder trans minus" type="button"></button>
        </li>
        <li>
          <input class="input input-text" type="text" value="Third choice">
          <button class="btn btn-noborder trans plus" type="button"></button>
          <button class="btn btn-noborder trans minus" type="button"></button>
        </li>
      </ul>
    </div>
  </div>
  <div class="m-input">
    <div class="required">
      <div>
        <input class="input-checkbox" id="${uuid}" type="checkbox">
        <label class="checkbox-label" for="${uuid}">Toggle</label>
      </div><span>Required</span>
      <button class="btn-tooltip" type="button" data-toggle="tooltip" data-placement="top" title=""
        data-original-title="Tooltip on top"></button>
    </div>
  </div>
`;

  const formNumber = `
  <div class="m-formBuilder_form-control">
    <button class="btn trans clone"></button>
    <button class="btn trans delete"></button>
  </div>
  <div class="m-formBuilder_form-item">
    <div class="m-input"><span class="m-input_label">
    <span>Number</span><small class="warning">*</small></span>
      <div class="input-area">
        <input class="input input-text" type="number" placeholder="">
      </div>
    </div>
  </div>
`;

  const fieldNumber = `
  <div class="m-formBuilder_field-option-title">Number</div>
  <div class="m-input">
    <span class="m-input_label">Label</span>
    <div class="input-area">
      <input class="input input-text" type="text" value="Number">
    </div>
  </div>
  <div class="m-input">
    <div class="required">
      <div>
        <input class="input-checkbox" id="${uuid}" type="checkbox">
        <label class="checkbox-label" for="${uuid}">Toggle</label>
      </div><span>Required</span>
      <button class="btn-tooltip" type="button" data-toggle="tooltip" data-placement="top" title=""
        data-original-title="Tooltip on top"></button>
    </div>
  </div>
`;

  if (dataType === "") {
    return
  }

  if (dataType == 'fullname_type') {
    setAttributes(formItemLi, { 'data-type': 'fullname_type' })
    setAttributes(fieldItemLi, { 'class': uuid })
    formItemLi.innerHTML = formName;
    fieldItemLi.innerHTML = fieldName;
  }

  if (dataType == 'email_type') {
    setAttributes(formItemLi, { 'data-type': 'email_type' })
    setAttributes(fieldItemLi, { 'class': uuid })
    formItemLi.innerHTML = formEmail;
    fieldItemLi.innerHTML = fieldEmail;
  }

  if (dataType == 'job_title_type') {
    setAttributes(formItemLi, { 'data-type': 'job_title_type' })
    setAttributes(fieldItemLi, { 'class': uuid })
    formItemLi.innerHTML = formJobTitle;
    fieldItemLi.innerHTML = fieldJobTitle;
  }

  if (dataType == 'organization_type') {
    setAttributes(formItemLi, { 'data-type': 'organization_type' })
    setAttributes(fieldItemLi, { 'class': uuid })
    formItemLi.innerHTML = formOrganization;
    fieldItemLi.innerHTML = fieldOrganization;
  }

  if (dataType == 'country_type') {
    setAttributes(formItemLi, { 'data-type': 'country_type' })
    setAttributes(fieldItemLi, { 'class': uuid })
    formItemLi.innerHTML = formCountry;
    fieldItemLi.innerHTML = fieldCountry;
  }

  if (dataType == 'province_city_type') {
    setAttributes(formItemLi, { 'data-type': 'province_city_type' })
    setAttributes(fieldItemLi, { 'class': uuid })
    formItemLi.innerHTML = formProvinceCity;
    fieldItemLi.innerHTML = fieldProvinceCity;
  }

  if (dataType == 'upload_avatar_type') {
    setAttributes(formItemLi, { 'data-type': 'upload_avatar_type' })
    setAttributes(fieldItemLi, { 'class': uuid })
    formItemLi.innerHTML = formUploadAvatar;
    fieldItemLi.innerHTML = fieldUploadAvatar;
  }

  if (dataType == 'line_text_type') {
    setAttributes(formItemLi, { 'data-type': 'line_text_type' })
    setAttributes(fieldItemLi, { 'class': uuid })
    formItemLi.innerHTML = formLineText;
    fieldItemLi.innerHTML = fieldLineText;
  }

  if (dataType == 'paragraph_type') {
    setAttributes(formItemLi, { 'data-type': 'paragraph_type' })
    setAttributes(fieldItemLi, { 'class': uuid })
    formItemLi.innerHTML = formParagraph;
    fieldItemLi.innerHTML = fieldParagraph;
  }

  if (dataType == 'dropdown_type') {
    setAttributes(formItemLi, { 'data-type': 'dropdown_type' })
    setAttributes(fieldItemLi, { 'class': uuid })
    formItemLi.innerHTML = formDropdown;
    fieldItemLi.innerHTML = fieldDropdown;
  }

  if (dataType == 'multi_choice_type') {
    setAttributes(formItemLi, { 'data-type': 'multi_choice_type' })
    setAttributes(fieldItemLi, { 'class': uuid })
    formItemLi.innerHTML = formMultiChoice;
    fieldItemLi.innerHTML = fieldMultiChoice;
  }

  if (dataType == 'checkboxes_type') {
    setAttributes(formItemLi, { 'data-type': 'checkboxes_type' })
    setAttributes(fieldItemLi, { 'class': uuid })
    formItemLi.innerHTML = formCheckboxes;
    fieldItemLi.innerHTML = fieldCheckboxes;
  }

  if (dataType == 'number_type') {
    setAttributes(formItemLi, { 'data-type': 'number_type' })
    setAttributes(fieldItemLi, { 'class': uuid })
    formItemLi.innerHTML = formNumber;
    fieldItemLi.innerHTML = fieldNumber;
  }

  if (control == 'add') {
    formContent.appendChild(formItemLi)
  } else {
    insertAfter(formItemLi, formContent.childNodes[control])
  }

  fieldContent.appendChild(fieldItemLi)

  /**
   * plus, minus choice
   */
  handleChoice(uuid, 'init')
}

function handleChoice(uuid, action, index) {
  const options = [];
  const thisLi = $('.m-formBuilder_field-option li.' + uuid + ' ' + '.m-choice_list li')
  const liItem = thisLi.eq(index);

  thisLi.each(function (index, item) {
    options.push($(item).find('.input').val())
  })
  renderSelect(options, uuid);

  if (action == 'plus') {
    const newLi = liItem.clone();
    var val = liItem.find('.input').val();
    options.push(val);
    renderSelect(options, uuid);
    liItem.parent().append(newLi);
  }

  if (action == 'minus') {
    var childLen = thisLi.parent().children().length;
    var val = liItem.find('.input').val();
    var index = options.indexOf(val);
    if (childLen <= 1) {
      return false;
    } else {
      options.splice(index, 1)
      liItem.remove();
      renderSelect(options, uuid);
    }
  }

}

function renderSelect(options, uuid) {
  $('.m-formBuilder_form-content li[data-field="' + uuid + '"] ' + '.select-box').empty();
  $('.m-formBuilder_form-content li[data-field="' + uuid + '"] ' + '.radio-box').empty();
  $('.m-formBuilder_form-content li[data-field="' + uuid + '"] ' + '.checkbox-box').empty();
  let name = nameGenerator(10);

  for (const i in options) {
    var opt = options[i]
    var optionElement = document.createElement('option')
    optionElement.textContent = opt;
    optionElement.value = opt;

    var radioElement = `
      <label class="module-check">
        <input class="form-checkbox check-item" type="radio" name="${name}"><span class="label">${opt}</span>
      </label>
    `;

    var checkboxElement = `
      <label class="module-check">
        <input class="form-checkbox check-item" type="checkbox" name="${name}"><span class="label">${opt}</span>
      </label>
    `;

    $('.m-formBuilder_form-content li[data-field="' + uuid + '"] ' + '.select-box').append(optionElement);
    $('.m-formBuilder_form-content li[data-field="' + uuid + '"] ' + '.radio-box').append(radioElement);
    $('.m-formBuilder_form-content li[data-field="' + uuid + '"] ' + '.checkbox-box').append(checkboxElement);
  }
}

function getDragAfterElement(container, y) {
  const draggablesForm = [...container.querySelectorAll('li')]

  return draggablesForm.reduce((closest, child) => {
    const box = child.getBoundingClientRect()
    const offset = y - box.top - box.height / 2
    if (offset < 0 && offset > closest.offset) {
      return { offset: offset, element: child }
    } else {
      return closest
    }
  }, { offset: Number.NEGATIVE_INFINITY }).element
}

function insertAfter(newNode, existingNode) {
  existingNode.parentNode.insertBefore(newNode, existingNode.nextSibling);
}

/**
   * clone, delete Item
   */

$('.m-formBuilder_form-content').on('click', '.btn.clone', function () {
  const index = $(this).parents('li').index();
  const dataType = $(this).parents('li').attr('data-type');
  dropItems(dataType, index);
  dragStartFormItem();
});

$('.m-formBuilder_form-content').on('click', '.btn.delete', function () {
  var dataField = $(this).parents('li').attr('data-field');
  $('.m-formBuilder_field-option li.' + dataField).remove();
  $(this).parents('li').remove();
});

/**
 * plus, minus button
 */

$('.m-formBuilder_field-option').on('click', '.btn.plus', function () {
  let uuid = $(this).parents('.m-choice_list').parents('.m-formBuilder_field-option li').attr('class')
  let index = $(this).parent().index();
  handleChoice(uuid, 'plus', index);
})

$('.m-formBuilder_field-option').on('click', '.btn.minus', function () {
  let uuid = $(this).parents('.m-choice_list').parents('.m-formBuilder_field-option li').attr('class')
  let index = $(this).parent().index();
  handleChoice(uuid, 'minus', index);
})


$('.m-formBuilder_field-option').on('input', '.m-choice_list .input', function () {
  let uuid = $(this).parents('.m-choice_list').parents('.m-formBuilder_field-option li').attr('class')
  let index = $(this).parent().index();
  let val = $(this).val();
  $('.m-formBuilder_form-content li[data-field="' + uuid + '"] ' + '.select-box option').eq(index).val(val);
  $('.m-formBuilder_form-content li[data-field="' + uuid + '"] ' + '.select-box option').eq(index).text(val);

  $('.m-formBuilder_form-content li[data-field="' + uuid + '"] ' + '.radio-box .module-check').eq(index).find('.input').val(val);
  $('.m-formBuilder_form-content li[data-field="' + uuid + '"] ' + '.radio-box .module-check').eq(index).find('.label').text(val);

  $('.m-formBuilder_form-content li[data-field="' + uuid + '"] ' + '.checkbox-box .module-check').eq(index).find('.input').val(val);
  $('.m-formBuilder_form-content li[data-field="' + uuid + '"] ' + '.checkbox-box .module-check').eq(index).find('.label').text(val);

});

/**
 * choose item
 */

$('ul.m-formBuilder_form-content').on('click', 'li', function (e) {
  var dataField = $(this).attr('data-field');
  var self = $(this);

  if ($(e.target).closest(".delete").length === 0) {
    // show hide selected item
    $('.m-formBuilder_field-option > li').hide();
    $('.m-formBuilder_field-option > li.' + dataField).show();
  }

  // show hide parent, active this
  $('.m-formBuilder_field-tab a').removeClass('active');
  $('.m-formBuilder_field-tab li:last-child a').addClass('active');
  $('.m-formBuilder_field-add').hide();
  $('.m-formBuilder_field-option').show();

  // click this
  $('ul.m-formBuilder_form-content li').removeClass('active');
  $(this).addClass('active');

  $('.m-formBuilder_field-option li.' + dataField + ' ' + '.required input[type=checkbox]').on('change', function () {
    const required = $(this).is(':checked');
    // const selectedValue = $('.m-formBuilder_field-option li.' + dataField + ' ' + '.select-box').val();
    // const selected = selectedValue ? ('.' + selectedValue + ' ') : '';
    if (required) {
      self.find('.warning').show()
      self.find('.input').prop('required', true);
    } else {
      self.find('.warning').hide()
      self.find('.input').prop('required', false);
    }
  })

  $('.m-formBuilder_field-option li.' + dataField + ' ' + '.input-area > input').on('input', function (e) {
    $('.m-formBuilder_form-content li[data-field="' + dataField + '"] ' + '.m-input_label > span').text(e.target.value);
  })

});

/**
 * clear form
 */
$('.btnClearForm').on('click', function () {
  $('.m-formBuilder_form-content').empty();
  $('.m-formBuilder_field-option').empty();
  $('#clearAll').modal('hide');
})
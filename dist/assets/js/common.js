var app = app || {};

var spBreak = 767;
const buttonColor = $('.m-groupColor_list') || undefined;
const buttonGroup = $('.m-group_list') || undefined;
const buttonCalendar = $('.m-calendar') || undefined;

app.init = function () {

  app.counterInput();
  app.timePicker();
  app.selectTime();
  app.numberChange();
  app.multiSelect();
  app.filterUser();
  app.editorQuill();
  app.dragFile();
  app.toggleClass(buttonColor);
  app.toggleClass(buttonGroup);
  app.toggleClass(buttonCalendar);
  app.toggleView();
  app.checkAll();
  app.togglePopup();
  app.startStop();
  app.inputValidate();
  app.validationCode();
  app.countdownTimer();
  app.scheduleSwipe();
  app.searchBox();
  app.swiper();
  app.sideFixed();
  app.showMore();
  app.heightContent();
  app.chatBox();
  app.menuSp();

};

app.isMobile = function () {

  return window.matchMedia('(max-width: ' + spBreak + 'px)').matches;

};

app.counterInput = function () {
  if($('.js-counter').length) {
    $('.m-input_counter').each(function(){
      $(this).find('.input-text').on('keyup', function() {
        var char = this.value.length;
        $(this).next('.counter').find('.count-up').text(char);
      })
    });
  }
}

app.timePicker = function () {
  if($('.datetimepicker').length) {
    $('.datetimepicker').datetimepicker({
      format: 'MMM D, YYYY',
      showClear: true,
    });
  }
}

app.selectTime = function () {
  if($('.js-select').length) {
    $('.js-select').each(function(){
      $(this).find('input').click(function(){
        $(this).next('.box-select').stop().fadeToggle();
      })
      $(this).find('.l-select li').click(function(){
        var val = $(this).attr('data-value');
        $(this).parents().eq(1).prev('input').val(val);
        $(this).parents().eq(1).fadeOut();
      })
    });
    $('.video-select').each(function(){
      var vid_ = $(this);
      $(this).find('.trigger').click(function(){
        $(this).next().next('.box-select').stop().fadeToggle();

      })
      $(this).find('.l-select li').click(function(){
        var val = $(this).attr('data-value');
        $(this).parents().eq(1).prev('input').val(val);
        $(this).parents().eq(1).fadeOut();
        vid_.find('input:text').show();
        vid_.parent().parent().find('.mejs__container').show();
      })
    });
  }
}

app.searchBox = function () {
  if($('.js-search-box').length) {
    $('.js-search-box').each(function(){
      var _item = $(this);
      _item.find('.input-search').on('keypress keyup blur paste', function(){
        var val = $(this).val();
        if(val !== '') {
          _item.addClass('active');
          _item.find('.box-select').fadeIn();
        } else {
          _item.removeClass('active');
          _item.find('.box-select').fadeOut();
        }
      })
      _item.find('.btn-clear').click(function(){
        _item.removeClass('active');
        _item.find('.box-select').fadeOut();
        _item.find('.input-search').val('');
      })
    })
  }
}

app.numberChange = function() {
  if($('.js-number').length) {
    $('.minus').click(function () {
      var $input = $(this).parent().find('input');
      var count = parseInt($input.val()) - 1;
      count = count < 1 ? 1 : count;
      $input.val(count);
      $input.change();
      return false;
    });
    $('.plus').click(function () {
      var $input = $(this).parent().find('input');
      $input.val(parseInt($input.val()) + 1);
      $input.change();
      return false;
    });
  }
}

app.multiSelect = function () {
  if($('.treeSelector').length) {
    $('.treeSelector').each(function(){
      var thisIs = $(this);
      $('.treeSelector .form-control').each(function(){
        $(this).click(function(){
          $('.custom-select-list').removeClass('active');
          $(this).next('.custom-select-list').addClass('active');
        })
      });
      // $(thisIs).find(".checkAll").click(function(){
      //   if ($(thisIs).find('.custom-select-list .form-checkbox:checked').length == $(thisIs).find('.custom-select-list .form-checkbox').length) {
      //     $(thisIs).find(".form-checkbox:checkbox:checked").click();
      //   } else {
      //     $(thisIs).find('.form-checkbox:checkbox').not(":checked").click();
      //   }
      // });
      $(thisIs).find('.custom-select-list .form-checkbox').change(function(event){
        event.preventDefault();
        $(this).toggleClass('active');
        if ($(thisIs).find('.custom-select-list .form-checkbox:checked').length == $(thisIs).find('.custom-select-list .form-checkbox').length) {
          $(thisIs).find(".checkAll").prop('checked', true);
        } else {
          $(thisIs).find(".checkAll").prop('checked', false);
        }
        var searchIDs = $(thisIs).find(".custom-select-list .form-checkbox:checked").map(function(){
          return $(this).val();
        }).get(); // <----
        var container = document.createElement('div');
        $(thisIs).find('.form-control').empty();
        container.innerHTML = '<div>' + searchIDs.join('</div><div>') + '</div>';
        $(thisIs).find('.form-control').append(container);
        $(thisIs).find('.form-control').attr('data-value', searchIDs);
        if($(thisIs).find('.form-control').attr('data-value') == '') {
          $(thisIs).find('.form-control').removeClass('active');
        } else {
          $(thisIs).find('.form-control').addClass('active');
        }
        if ($(thisIs).find('.custom-select-list .form-checkbox:checked').length) {
          $(thisIs).find('.btn-clear-select').show();
        } else {
          $(thisIs).find('.btn-clear-select').hide();
        }
        $(thisIs).find('.form-control > div > div').each(function(){
          var txt = $(this).text();
          $(this).attr('data-value', txt);
          $(this).click(function(){
            var data = $(this).attr('data-value');
            $(this).remove();
            $(thisIs).find('.custom-select-list input[value="' + data + '"]').click();
            if ($(thisIs).find('.custom-select-list .form-checkbox:checked').length == $(thisIs).find('.custom-select-list .form-checkbox').length) {
              $(thisIs).find(".checkAll").prop('checked', true);
            } else {
              $(thisIs).find(".checkAll").prop('checked', false);
            }
          })
        });
        $(thisIs).find('.btn-clear-select').click(function(){
          $(this).hide();
          $(thisIs).find('.custom-select-list .form-checkbox:checked').click();
        })
      });
    })
  }
  $(document).click(function(event) {
    if (!$(event.target).closest(".treeSelector").length) {
      $("body").find(".custom-select-list").removeClass("active");
    }
  });
}

app.filterUser = function () {
  $('[data-search]').on('keyup', function() {
		var searchVal = $(this).val();
		var filterItems = $('[data-filter-item]');
		if ( searchVal != '' ) {
			filterItems.css({display:'none'});
			$('[data-filter-item][data-filter-name*="' + searchVal.toLowerCase() + '"]').css({display:'list-item'});
		} else {
			filterItems.css({display:'list-item'});
		}
	});
  $('.custom-select-list').each(function(){
    $(this).find('.btn-clear').click(function(){
      $(this).prev('input').val('');
      $(this).parents().eq(1).find('.l-multiple li').css({display:'list-item'});
    })
  })

}

app.editorQuill = function () {
  const toolbarOptions = {
    container: [
      ['undo', 'redo'],
      [{ 'header': [1, 2, 3, 4, 5, 6, false] }],

      ['bold', 'italic', 'underline', 'strike'],
      ['blockquote', 'code-block'],

      [{ 'header': 1 }, { 'header': 2 }],
      [{ 'list': 'ordered' }, { 'list': 'bullet' }],
      [{ 'script': 'sub' }, { 'script': 'super' }],
      [{ 'indent': '-1' }, { 'indent': '+1' }],
      [{ 'direction': 'rtl' }],

      [{ 'color': [] }, { 'background': [] }],
      [{ 'align': [] }],
      ['link', 'image'],

      ['clean']
    ],
    handlers: {
      'undo': () => editor.history.undo(),
      'redo': () => editor.history.redo(),
    }
  }
  var icons = Quill.import("ui/icons");

  icons["undo"] = `<svg width="19" height="17" viewBox="0 0 19 17" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M12.5 4.5H3.36125L6.0515 1.8105L5 0.75L0.5 5.25L5 9.75L6.0515 8.68875L3.3635 6H12.5C13.6935 6 14.8381 6.47411 15.682 7.31802C16.5259 8.16193 17 9.30653 17 10.5C17 11.6935 16.5259 12.8381 15.682 13.682C14.8381 14.5259 13.6935 15 12.5 15H6.5V16.5H12.5C14.0913 16.5 15.6174 15.8679 16.7426 14.7426C17.8679 13.6174 18.5 12.0913 18.5 10.5C18.5 8.9087 17.8679 7.38258 16.7426 6.25736C15.6174 5.13214 14.0913 4.5 12.5 4.5Z" fill="#6F767E"/>
  </svg>`;

  icons["redo"] = `<svg width="19" height="17" viewBox="0 0 19 17" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M6.5 4.5H15.6388L12.9485 1.8105L14 0.75L18.5 5.25L14 9.75L12.9485 8.68875L15.6365 6H6.5C5.30653 6 4.16193 6.47411 3.31802 7.31802C2.47411 8.16193 2 9.30653 2 10.5C2 11.6935 2.47411 12.8381 3.31802 13.682C4.16193 14.5259 5.30653 15 6.5 15H12.5V16.5H6.5C4.9087 16.5 3.38258 15.8679 2.25736 14.7426C1.13214 13.6174 0.5 12.0913 0.5 10.5C0.5 8.9087 1.13214 7.38258 2.25736 6.25736C3.38258 5.13214 4.9087 4.5 6.5 4.5Z" fill="#6F767E"/>
  </svg>`;

  const options = {
    theme: 'snow',
    modules: {
      toolbar: toolbarOptions,
      history: {
        userOnly: true
      }
    }
  };

  var editorDemo = document.getElementById('editorDemo')
  var editorEvent = document.getElementById('editorEvent')
  var editorBranding = document.getElementById('editorBranding')
  var editorRecpt = document.getElementById('editorRecpt')
  var editorBooth = document.getElementById('editorBooth')
  var editorBoothEdit = document.getElementById('editorBoothEdit')
  var editorEventCreate = document.getElementById('editorEventCreate')
  var editorProfileEdit = document.getElementById('editorProfileEdit')

  if (editorDemo) {
    var editor = new Quill(editorDemo, options);
  }

  if (editorEvent) {
    var editor = new Quill(editorEvent, options);
  }

  if (editorBranding) {
    var editor = new Quill(editorBranding, options);
  }

  if (editorRecpt) {
    var editor = new Quill(editorRecpt, options);
  }

  if (editorBooth) {
    var editor = new Quill(editorBooth, options);
  }

  if (editorBoothEdit) {
    var editor = new Quill(editorBoothEdit, options);
  }

  if (editorEventCreate) {
    var editor = new Quill(editorEventCreate, options);
  }

  if (editorProfileEdit) {
    var editor = new Quill(editorProfileEdit, options);
  }

}

app.dragFile = function () {
  if($('.input-file').length) {
    $('.input-file-wrap').each(function(){
      var this_ = $(this);
      this_.find('.input-file').change(function(){
        const file = this.files[0];
        const fileName = file.name;
        console.log(fileName);
        if (file){
          this_.addClass('has-file');
          let reader = new FileReader();
          reader.onload = function(event){
            this_.find('.img-upload').attr('src', event.target.result);
            this_.parent().next('.frame-mobile').find('.preview-img').attr('src', event.target.result);
          }
          reader.readAsDataURL(file);
          this_.find('.video-name span').text(fileName);
        }
      });
      this_.find('.btn-remove').click(function(){
        this_.removeClass('has-file');
        this_.find('.input-file').val('');
        this_.find('.img-upload').attr('src', '');
        this_.parent().next('.frame-mobile').find('.preview-img').attr('src', '');
        this_.find('.video-name span').text('');
      });
      // this_.find('.btn-upload').click(function(){
      //   this_.find('.input-file').click();
      // })
      // this_.find('.btn-update').click(function(){
      //   this_.find('.input-file').click();
      // })
      // this_.find('.m-input_video').click(function(){
      //   this_.find('.input-file').click();
      // })
    })
  }
}

app.toggleClass = function(element) {
  if (element !== undefined) {
    const button = element.find('button');
    button.on('click', function(e) {
      e.preventDefault();
      button.removeClass('current');
      $(this).addClass('current');
      $('.m-calendar_item').each(function(){
        var _item = $(this);
        if(_item.find('.m-calendar_item-box').hasClass('current')) {
          _item.find('.m-calendar_item-label').addClass('current');
        } else {
          _item.find('.m-calendar_item-label').removeClass('current');
        }
      })

    })
  }
}

app.toggleView = function() {
  $('.js-view').click(function(){
    $('.js-view').removeClass('is-active');
    $(this).addClass('is-active');
    var dataV = $(this).attr('data-view');
    $('.view-content').attr('data-hidden', true);
    $('.view-content#'+ dataV).attr('data-hidden', false);
  });
}

app.togglePopup = function() {
  $('.js-popup').click(function(){
    $(this).toggleClass('is-active');
    var dataP = $(this).attr('data-popup');
    if($(this).hasClass('is-active')){
      $('.js-box-popup#'+ dataP).attr('data-hidden', false);
    } else {
      $('.js-box-popup#'+ dataP).attr('data-hidden', true);
    }
  });
}

app.checkAll = function() {
  $('.js-checkAll').each(function(){
    var thisC = $(this);
    thisC.find('.checkAll').click(function(){
      thisC.find('.check-item').prop('checked', this.checked);
      if ($(this).is(':checked')) {
        thisC.find('.hide-element').hide();
        thisC.find('.send-invite').addClass('active');
      } else {
        thisC.find('.hide-element').show();
        thisC.find('.send-invite').removeClass('active');
      }

    });
  })
}

app.startStop = function() {

  $('#modalStartStop .btn-primary').click(function(){
    var valueConfirm = $('#modalStartStop .input-text').val();
    var checkConfirm = valueConfirm.toLowerCase();
    if(checkConfirm != '' && checkConfirm == 'start') {
      $('#modalStartStop .modal-content').addClass('is-start');
      $('#modalStartStop').modal('toggle');
      $('.m-head-event_control .btn-start').addClass('running');
      $('#modalStartStop .input-text').val('');
    }
  });

  $('#modalStartStop .btn-secondary').click(function(){
    var valueConfirm = $('#modalStartStop .input-text').val();
    var checkConfirm = valueConfirm.toLowerCase();
    if(checkConfirm != '' && checkConfirm == 'pause') {
      $('#modalStartStop .modal-content').removeClass('is-start');
      $('#modalStartStop').modal('toggle');
      $('.m-head-event_control .btn-start').removeClass('running');
      $('#modalStartStop .input-text').val('');
    }
  });

}

app.inputValidate = function() {
  $('.js-mail-validate').on('keypress keyup blur paste', function(){
    var testEmail = /^[A-Z0-9._%+-]+@([A-Z0-9-]+\.)+[A-Z]{2,4}$/i;
    if (testEmail.test(this.value)) {
      $(this).parent('.input-area').addClass('success');
      $(this).parent('.input-area').removeClass('failed');
      $(this).closest('.m-input').next('.btn-submit').addClass('is-active');
    } else {
      $(this).parent('.input-area').addClass('failed');
      $(this).parent('.input-area').removeClass('success');
      $(this).closest('.m-input').next('.btn-submit').removeClass('is-active');
    }
  });
  $('.btn-back-clear').click(function(){
    $(this).parent('.input-area').removeClass('failed');
    $(this).next('.input-email').val('');
  })
  $('.js-filled').each(function(){
    $('.js-filled').on("keypress keyup blur paste",function (event) {
      if($(this).val() !== '') {
        $(this).addClass('success');
      } else {
        $(this).removeClass('success');
      }
    });
  })
  $('.pass-field').each(function(){
    $('.input-password').on("keypress keyup blur paste",function (event) {
      if($(this).val() !== '') {
        $(this).parent().addClass('filled');
      } else {
        $(this).parent().removeClass('filled');
      }
    });
    $(this).find('.btn-eye').click(function(){
      $(this).toggleClass('type');
      if($(this).hasClass('type')) {
        $(this).next('.input-password').prop('type', 'text');
      } else {
        $(this).next('.input-password').prop('type', 'password');
      }
    })
  })
}

app.validationCode = function () {
  const inputElements = [...document.querySelectorAll('input.code-input')]

  inputElements.forEach((ele,index)=>{
    ele.addEventListener('keydown',(e)=>{
      if(e.keyCode === 8 && e.target.value==='') inputElements[Math.max(0,index-1)].focus()
    })
    ele.addEventListener('input',(e)=>{
      const [first,...rest] = e.target.value
      e.target.value = first ?? ''
      const lastInputBox = index===inputElements.length-1
      const didInsertContent = first!==undefined
      if(didInsertContent && !lastInputBox) {
        // continue to input the rest of the string
        inputElements[index+1].focus()
        inputElements[index+1].value = rest.join('')
        inputElements[index+1].dispatchEvent(new Event('input'))
      }
    })
  })
  $('.code-input').on("keypress keyup blur paste",function (event) {
    $(this).val($(this).val().replace(/[^0-9\.]/g,''));
    if ((event.which != 46 || $(this).val().indexOf('.') != -1) && (event.which < 48 || event.which > 57)) {
        event.preventDefault();
    }
    if($(this).val() !== '') {
      $(this).parent().addClass('filled');
    } else {
      $(this).parent().removeClass('filled');
    }
    if ($('.number-code .code-shell.filled').length == 4) {
      $('.btn-submit').addClass('waiting');
      $('.btn-submit').addClass('is-active');
    } else {
      $('.btn-submit').removeClass('waiting');
      $('.btn-submit').removeClass('is-active');
    }
  });
}

app.countdownTimer = function () {
  function timerC() {
    var timer2 = "1:30";
    var interval = setInterval(function() {
      var timer = timer2.split(':');
      var minutes = parseInt(timer[0], 10);
      var seconds = parseInt(timer[1], 10);
      --seconds;
      minutes = (seconds < 0) ? --minutes : minutes;
      if (minutes < 0) {
        clearInterval(interval);
        $('.btn-resend').addClass('show');
        $('.countdown-timer').addClass('hide');
      }
      seconds = (seconds < 0) ? 59 : seconds;
      seconds = (seconds < 10) ? '0' + seconds : seconds;
      //minutes = (minutes < 10) ?  minutes : minutes;
      $('.js-coundown small').html(minutes + ':' + seconds);
        timer2 = minutes + ':' + seconds;
    }, 1000);
  }
  timerC();
  $('.btn-resend').click(function(){
    timerC();
    setTimeout(function(){
      $('.btn-resend').removeClass('show');
      $('.countdown-timer').removeClass('hide');
    }, 1000);
  })
}

app.scheduleSwipe = function() {
  // $('.js-m-calendar').slick({
  //   dots: false,
  //   slidesToShow: 9,
  //   infinite: false
  // });
  var swiper = new Swiper(".js-m-calendar", {
    slidesPerView: "auto",
    spaceBetween: 0,
    slidesOffsetAfter: 0,
    // loopFillGroupBlank: false,
    // slidesPerGroup: 9,
    observer: true,

    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },
    navigation: {
      nextEl: '.m-calendar_button.next',
      prevEl: '.m-calendar_button.prev'
    }
  });
  $(window).on("resize", function() {
    swiper.updateProgress();
  });
  var init = false;
  function swiperCard() {
    if (window.innerWidth <= 768) {
      if (!init) {
        init = true;
        swiper = new Swiper(".m-landing .m-group_list", {
          slidesPerView: "auto",
          spaceBetween: 8,
        });
        swiperSession = new Swiper(".js-session", {
          slidesPerView: "auto",
          spaceBetween: 0,
          pagination: {
            el: ".swiper-pagination",
            clickable: true,
          },
        });
      }
    } else if (init) {
      $('.swiper-container').each(function(){
        this.swiper.destroy(false);
      })
      // swiperSS.destroy(false, true);
      // swiperSession.destroy(false, true);

      init = false;
    }
  }
  swiperCard();
  window.addEventListener("resize", swiperCard);
  $(window).on('load resize', function(){

    setTimeout(function(){
      if($('.m-calendar_button').hasClass('swiper-button-lock')) {
        $('.m-calendar').addClass('overwrap');
      } else {
        $('.m-calendar').removeClass('overwrap');
      }
    },200);
    $('.nav-tabs a').click(function(){
      setTimeout(function(){
        if($('.m-calendar_button').hasClass('swiper-button-lock')) {
          $('.m-calendar').addClass('overwrap');
        } else {
          $('.m-calendar').removeClass('overwrap');
        }
      },500);

    });
  })

}

app.swiper = function () {
  var swiper = new Swiper(".ct-footer", {
    slidesPerView: "auto",
    spaceBetween: 33,
    pagination: {
      // el: ".swiper-pagination",
      clickable: true,
    },
  });
}

app.sideFixed = function () {
  $(window).scroll(function () {
    var threshold = $('.m-header').outerHeight();
    if ($(window).scrollTop() >= threshold)
      $('.m-landing_aside').addClass('fixed');
    else
      $('.m-landing_aside').removeClass('fixed');
    var check = $(".m-landing").height() - $(".m-landing_aside-inner").height()-21;
    if ($(window).scrollTop() >= check)
      $('.m-landing_aside').addClass('bottom');
    else
      $('.m-landing_aside').removeClass('bottom');
  });
}

app.showMore = function () {
  $(document).ready(function(){
    var height = $('.wrapper-height').outerHeight();
    if(height >= 470) {
      $('.about-event_inner').css('height', 470);
    }
    $('.btn-show-more').click(function(){
      $('.about-event_inner').css('height', height);
      $('.about-event').addClass('show');
    });
  })
}

app.widget = () => {
  // Open widget
  $(document).on('click', '.widget-open', () => {
    if(!$('.widget').hasClass('activated')) {
      $('.widget').addClass('activated');
      $('#notification').addClass('activated');
    }
  });

  // Close widget
  $(document).on('click', '.widget-close', () => {
    if($('.widget').hasClass('activated')) {
      $('.widget').removeClass('activated');
      $('#notification').removeClass('activated');
    }
  });
}

app.toggleCheckbox = () => {
  const button2 = document.querySelector(".button2");
  const button3 = document.querySelector(".button3");
  $(document).on('click', '.btn-toggle-label', () => {
    button2.classList.toggle("move");
    button3.classList.toggle("push");
  });
}

app.quality = () => {
  $(document).on('click', '.btn-share-screen', (e) => {
    if(!$('.btn-video-share').hasClass('stop-share-screen')) {
      $('.btn-video-share').addClass('stop-share-screen');
      $('.video-share-main').removeClass('is-activated');
    }
  });
  $(document).on('click', '.btn-video-share', (e) => {
    if($(e.target).hasClass('stop-share-screen')) {
      $(e.target).removeClass('stop-share-screen')
    } else {
      if(!$('.video-share-main').hasClass('is-activated')) {
        $('.video-share-main').addClass('is-activated');
        $(e.target).addClass('is-activated');
      } else {
        $('.video-share-main').removeClass('is-activated');
        $(e.target).removeClass('is-activated');
      }
    }
  });

  $(document).on('click', '.btn-layout-card', (e) => {
    $('.btn-layout-gird').removeClass('is-activated');
    if(!$('.box-live').hasClass('box-live-card')) {
      $('.box-live').addClass('box-live-card');
      $(e.target).addClass('is-activated');
    } else {
      $('.box-live').removeClass('box-live-card');
      $(e.target).removeClass('is-activated');
    }
  });

  $(document).on('click', '.btn-layout-gird', (e) => {
    $('.btn-layout-card').removeClass('is-activated');
    $('.box-live').removeClass('box-live-card');
    if(!$(e.target).hasClass('is-activated')) {
      $(e.target).addClass('is-activated');
    } else {
      $(e.target).removeClass('is-activated');
    }
  });

  $(document).on('click', '.btn-host', (e) => {
    if(!$('.video-control-host').hasClass('is-activated')) {
      $('.video-control-host').addClass('is-activated');
      $(e.target).addClass('is-activated');
    } else {
      $('.video-control-host').removeClass('is-activated');
      $(e.target).removeClass('is-activated');
    }
  });

  $(document).on('click', '.btn-fullscreen', (e) => {
    if(!$('.layout-agenda').hasClass('is-activated')) {
      $('.layout-agenda').addClass('is-activated');
      $(e.target).addClass('is-activated');
    } else {
      $('.layout-agenda').removeClass('is-activated');
      $(e.target).removeClass('is-activated');
    }
  });

  $(document).on('click', '.btn-emoji', (e) => {
    if(!$('.video-emoji-list').hasClass('is-activated')) {
      $('.video-emoji-list').addClass('is-activated');
      $(e.target).addClass('is-activated');
    } else {
      $('.video-emoji-list').removeClass('is-activated');
      $(e.target).removeClass('is-activated');
    }
  });

  $(document).on('click', '.video-emoji-list li > a', (e) => {
    $('.video-emoji-list').removeClass('is-activated');
    $('.btn-emoji').removeClass('is-activated');
  });

  $(document).on('click', '.video-menu', (e) => {
    if(!$('.video-menu-item').hasClass('is-activated')) {
      $('.video-menu-item').addClass('is-activated');
      $(e.target).addClass('is-activated');
    } else {
      $('.video-menu-item').removeClass('is-activated');
      $(e.target).removeClass('is-activated');
    }
  });

  $(document).on('click', '.video-menu-item li > a', (e) => {
    $('.video-menu-item').removeClass('is-activated');
    $('.video-menu').removeClass('is-activated');
  });

  $(document).on('click', '.quality-label', (e) => {
    if(!$('.quality-list').hasClass('is-activated')) {
      $('.quality-list').addClass('is-activated');
      $(e.target).addClass('is-activated');
    } else {
      $('.quality-list').removeClass('is-activated');
      $(e.target).removeClass('is-activated');
    }
  });
  $(document).on('click', '.quality-list li > a', (e) => {
    $('.quality-label').removeClass('is-activated');
    $('.quality-list').removeClass('is-activated');
    const className = $(e.target).find('span').attr('class');
    $('.quality-list > li').removeClass('is-activated');
    $(e.target).parents('li').addClass('is-activated');
    if(className === 'ico-ld'){
      $('.quality-label').find('span').addClass(className).removeClass('ico-hd');
    } else {
      $('.quality-label').find('span').addClass(className).removeClass('ico-ld');
    }
  });
}

app.tab = () => {
  // Active body default
  const tabBody = $('.tag-js .tab-header').find('a.is-activated');
  tabBody.each((key, value) => {
    $($(value).attr('attr-body')).show();
  });

  $(document).on('click', '.tag-js .tab-header a', (e) => {
    if(!$(this).hasClass('is-activated')) {
      // Tab header
      $(e.target).parent().find('a').removeClass('is-activated');
      $(e.target).addClass('is-activated');

      // Tab body
      $(e.target).parents('.tag-js').find('.tab-content').hide();
      const tabBody = $(e.target).attr('attr-body');
      $(tabBody).show();

      const tabItemBody = $('.tab-item .tab-header a.is-activated').attr('attr-body');
      $(tabItemBody).show();
    }
  });
}

app.selectBox = () => {
  $(document).on('click', '.input-select .label', (e) => {
    if(!$(e.target).next().hasClass('is-activated')) {
      $(e.target).next().addClass('is-activated');
    } else {
      $(e.target).next().removeClass('is-activated');
    }
  });
  $(document).on('click', '.input-select ul > li', (e) => {
    if(!$(e.target).hasClass('is-activated')) {

      const itemValue = $(e.target).data('value');

      if($(e.target).parents('.sort-type').length > 0) {
        const itemText = $(e.target).find('span').attr('class');
        $(e.target).parents('.input-select').find('.label').find('span').attr('class', itemText);
      } else {
        const itemText = $(e.target).text();
        $(e.target).parents('.input-select').find('.label').text(itemText);
      }

      $(e.target).parents('ul').removeClass('is-activated');
      $(e.target).parents('.input-select').find('input').val(itemValue);
      $(e.target).parents('ul').find('li').removeClass('is-activated');
      $(e.target).addClass('is-activated');
    }
  });
}

app.actionPoll = () => {
  $(document).on('click', '.btn-status-stage', (e) => {
    if(!$('.poll-info').hasClass('is-activated')) {
      $('.poll-info').addClass('is-activated');

      $('#btn-status-stage').find('.ico-laptop').addClass('ico-laptop-off');
      $('#btn-status-stage').find('label').text('Hide from stage');
      $('#btn-status-stage').find('.ico-laptop').removeClass('ico-laptop');
    } else {
      $('.poll-info').removeClass('is-activated');
      $('#btn-status-stage').find('.ico-laptop-off').addClass('ico-laptop');
      $('#btn-status-stage').find('label').text('Show on stage');
      $('#btn-status-stage').find('.ico-laptop-off').removeClass('ico-laptop-off');
    }
  });
}

app.actionQa = () => {
  $(document).on('click', '.btn-qa-menu', (e) => {
    if(!$(e.target).next().hasClass('is-activated')) {
      $(e.target).next().addClass('is-activated');
    } else {
      $(e.target).next().removeClass('is-activated');
    }
  });
}

app.actionComment = () => {
  $(document).on('click', '.btn-comment', (e) => {
    if(!$('.side-comment').hasClass('is-activated')) {
      $('.side-comment').addClass('is-activated');
    }
  });
  $(document).on('click', '.btn-comment-back', (e) => {
    if($('.side-comment').hasClass('is-activated')) {
      $('.side-comment').removeClass('is-activated');
    }
  });
}

app.heightContent = function() {
  $(window).on('resize load', function(){
    var winH = $(window).outerHeight();
    var headH = $('.m-header').outerHeight();
    var headEv = $('.m-head-event').outerHeight();
    var contentH = $('.homepage .m-asideList');
    contentH.css('min-height', winH - (headH + headEv + 25));
  })
}

app.chatBox = function () {
  $('.chat-box .btn-open').click(function(){
    $('.box-chat').stop().fadeToggle();
  })
  $('.chat-box .btn-close').click(function(){
    $('.box-chat').stop().fadeOut();
  })
  $('.btn-close-quote').click(function(){
    $(this).parent().hide();
  })
  $(window).on('load resize', function() {
    var winH = $(window).outerHeight() - 164;
    var headH = $('.m-header').outerHeight() + 80;
    $('.box-chat').css('height', winH);
    if($(window).width() < 768) {
      $('.box-chat').css('height', winH - headH);
    }
  })
}

app.chatMenu = function () {
  $('.chat-action-menu').click(function(e){
    if(!$(e.target).next().hasClass('is-activated')) {
      $(e.target).next().addClass('is-activated');
      $(e.target).parents('.chat-item-action').css('z-index', 9999);
    } else {
      $(e.target).next().removeClass('is-activated');
      $(e.target).parents('.chat-item-action').removeAttr('style');
    }
  });

  $('.chat-item-content').mouseover(function(e){
    if(!$(e.target).find('.chat-action-group').hasClass('is-activated')) {
      $(e.target).find('.chat-action-group').addClass('is-activated');
    }
  });
}

app.chatUserInfo = function () {
  $('.btn-user-info').click(function(e){
    $('.box-user-info').css('top', $(this).offset().top).css('left', ($(this).offset().left + 60))
    if(!$('.box-user-info').hasClass('is-activated')) {
      $('.box-user-info').addClass('is-activated');
    }
  });
}

app.peopleSortType = function () {
  $('.sort-type .input-select > ul > li').click(function(e){
    if($(e.target).find('.ico-grid-view').length > 0) {
      $('.people-list').addClass('grid-list');
    } else {
      $('.people-list').removeClass('grid-list');
    }
  });
}

const networkApp = {
  btnVideo: () => {
    $(document).on('click', '.btn-network-video', (e) => {
      if(!$(e.target).hasClass('is-disabled')) {
        $(e.target).addClass('is-disabled');
        $('.network-item-host').addClass('network-avatar-full-disabled');
      } else {
        $(e.target).removeClass('is-disabled');
        $('.network-item-host').removeClass('network-avatar-full-disabled');
      }
    })
  },
  btnMic: () => {
    $(document).on('click', '.btn-network-mic', (e) => {
      if(!$(e.target).hasClass('is-disabled')) {
        $(e.target).addClass('is-disabled');
        $('.network-item-host').addClass('network-mic-disabled');
      } else {
        $(e.target).removeClass('is-disabled');
        $('.network-item-host').removeClass('network-mic-disabled');
      }
    })
  },
  btnViewList: () => {
    $(document).on('click', '.btn-network-list', (e) => {
      if(!$(e.target).hasClass('is-activated')) {
        $(e.target).addClass('is-activated');
        $('.btn-network-card').removeClass('is-activated');
        $('.btn-network-user').removeClass('is-activated');
        $('#modalNetworkJoin .modal_body').addClass('is-view-list');
        $('#modalNetworkJoin .modal_body').removeClass('is-view-user');
      }
    })
  },
  btnViewCard: () => {
    $(document).on('click', '.btn-network-card', (e) => {
      if(!$(e.target).hasClass('is-activated')) {
        $(e.target).addClass('is-activated');
        $('.btn-network-list').removeClass('is-activated');
        $('.btn-network-user').removeClass('is-activated');
        $('#modalNetworkJoin .modal_body').removeClass('is-view-list');
        $('#modalNetworkJoin .modal_body').removeClass('is-view-user');
      }
    })
  },
  btnViewUser: () => {
    $(document).on('click', '.btn-network-user', (e) => {
      if(!$(e.target).hasClass('is-activated')) {
        $(e.target).addClass('is-activated');
        $('#modalNetworkJoin .modal_body').addClass('is-view-user');
        $('.btn-network-list').removeClass('is-activated');
        $('.btn-network-card').removeClass('is-activated');
        $('#modalNetworkJoin .modal_body').removeClass('is-view-list');
      }
    })
  },
  btnFullScreen: () => {
    $(document).on('click', '.btn-full-screen-network', (e) => {
      if(!$('#modalNetworkJoin').hasClass('is-full-screen')) {
        $('#modalNetworkJoin').addClass('is-full-screen');
      } else {
        $('#modalNetworkJoin').removeClass('is-full-screen');
      }
    });
  },
  btnChat: () => {
    $(document).on('click', '.btn-network-comment', (e) => {
      if(!$('#modalNetworkJoin').hasClass('is-view-chat')) {
        $('#modalNetworkJoin').addClass('is-view-chat');
      } else {
        $('#modalNetworkJoin').removeClass('is-view-chat');
      }
    });
  },
}

const receptionApp = {
  btnReceptionAction: () => {
    $(document).on('click', '.btn-receptions-action', (e) => {
      if(!$('#modalCreateNotification .modal-wrapper').hasClass('active')) {
        $('#modalCreateNotification .modal-wrapper').addClass('active');
      }
    });
    $(document).on('click', '#receptions-options li a', (e) => {
      $('#modalCreateNotification .modal-wrapper').removeClass('active');
      if(!$('#modalCreateNotification .modal-wrapper').hasClass('active-choose')) {
        const optionText = $(e.target).text();
        $('.receptions-type-txt').text(optionText);
        $('#modalCreateNotification .modal-wrapper').addClass('active-choose');
        if(optionText === 'External link') {
          if(!$('#modalCreateNotification .modal-wrapper').hasClass('active-external-link')) {
            $('#modalCreateNotification .modal-wrapper').addClass('active-external-link');
          }
        }
      }
    });
    $(document).on('click', '.btn-clear-reception', (e) => {
      $('#modalCreateNotification .modal-wrapper').removeClass('active-choose');
      $('#modalCreateNotification .modal-wrapper').removeClass('active-external-link');
    });

  },
}

app.menuSp = function() {
  $('.m-header .btn-menu').click(function(){
    $('.m-header .nav').stop().toggleClass('active');
  })
  $('.close-nav').click(function(){
    $('.m-header .nav').removeClass('active');
  })
}

const agendaApp = {
  btnFilterTag: () => {
    $('.filter-tags-select').select2({
      placeholder: "Please choose tags",
    });
  },
}

$(function () {

  app.init();
  $('[data-toggle="tooltip"]').tooltip()

  app.toggleCheckbox();
  app.quality();

  app.tab();

  // Widget
  app.widget();

  app.selectBox();
  app.actionPoll();
  app.actionQa();
  app.actionComment();
  app.chatMenu();
  app.chatUserInfo();
  app.peopleSortType();

  new Swiper(".video-host", {
    slidesPerView: 'auto',
    spaceBetween: 16,
  });

  new Swiper(".js-swiper-tab", {
    slidesPerView: "auto",
    spaceBetween: 24,
  });

  // Page network
  networkApp.btnVideo();
  networkApp.btnMic();
  networkApp.btnViewCard();
  networkApp.btnViewList();
  networkApp.btnViewUser();
  networkApp.btnFullScreen();
  networkApp.btnChat();

  // Page reception
  receptionApp.btnReceptionAction();

  // Page agenda
  agendaApp.btnFilterTag();

  $(window).on('load resize', function(){
    if (window.innerWidth <= 767) {
      $('.m-landing .js-session .session-desc').each(function(){
        var show_char = 155;
        var ellipses = "... ";
        var content = $(this).html();

        if (content.trim().length > show_char) {
          var a = content.trim().substr(3, show_char); // use 3 to avoid <p>
          var b = content.trim().substr(show_char - content.trim().length).replace('</p>' , '');  // replace the last </p>
          var html = a + "<span class='truncated'>" + ellipses + "</span><span class='truncated' style='display:none'>" + b + "</span><a class='read-more' href='#'>See more</a>";
          // wrap the a into `<p></p>` then append the read more to it
          $(this).html('<p>' + html  + '</p>');
        }
      });

      // $(".read-more").click(function(e) {
      //   e.preventDefault();
      //   $(this).text( ( i , v) => v == "Read more" ? "Read Less" : "Read more"); //change here..
      //   $(this).closest(".aaa").find(".truncated").toggle();
      // });
    }

    $('#modalDetailSession').on('show.bs.modal', function (e) {
      if (window.innerWidth > 767) {
        return e.preventDefault();
      }
    })
  })

  $(document).ready(function () {
    $('a[href*=\\#]:not([href$=\\#])').click(function(event) {
      event.preventDefault();
      $('html, body').animate({
        scrollTop: $($.attr(this, 'href')).offset().top - 120
      }, 500);
    });
  });

  $(window).scroll(function () {
    var scrollDistance = $(window).scrollTop();
    var bannerH = $('.ld-banner').height() - 70;
    if($(window).width() > 767) {
      var wHeight = 0;
    } else {
      var wHeight = 150;
    }
    $('.page-section').each(function (i) {
      if ($(this).position().top <= scrollDistance + wHeight) {
        $('.js-swiper-tab a.active').removeClass('active');
        $('.js-swiper-tab a').eq(i).addClass('active');
      }
    });
    if(scrollDistance >= bannerH) {
      $('.m-landing .tabs-control').addClass('fixed');
      $('.enter-event').addClass('fixed');
    }else {
      $('.m-landing .tabs-control').removeClass('fixed');
      $('.enter-event').removeClass('fixed');
    }
  }).scroll();

});

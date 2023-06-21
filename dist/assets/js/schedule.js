function renderPixel(dataTime) {
  // dateTime format: 0:00 -> 24:00
  const rootTime = 0
  const startTime = dataTime.split(':')
  const hour = parseInt(startTime[0], 10)
  const minute = parseInt(startTime[1], 10)
  const distance = hour - rootTime
  const padding = 10
  const pixel = distance * 60 + minute + padding
  return pixel
}

/**
 * click outside element
 */

$(document).on('click', function(e) {
  const element = $('.m-session, .btn-add--session');
  if (!element.is(e.target) && element.has(e.target).length === 0) {
    element.removeClass('active')
  }
})

/**
 * booth add link
 */

$('.btn-add_link').on('click', function() {
  $(this).toggleClass('active');
  $(this).next('.addUrl').toggleClass('active');
})

/**
 * multi modal
 */

$(document).on('show.bs.modal', '.modal', function() {
  const zIndex = 1040 + 10 * $('.modal:visible').length;
  $(this).css('z-index', zIndex);
  setTimeout(() => $('.modal-backdrop').not('.modal-stack').css('z-index', zIndex - 1).addClass('modal-stack'));
});


/**
 * set time line
 */

const timeline = $(window).on('load resize', function () {
  const widthLine = $('.m-timeline_item-line').width()
  const timelinePart = $('.m-timeline_part')
  const redLine = $('.m-timeline_redline')
  const breakPart = $('.m-timeline_break')
  const today = new Date()
  const hour = today.getHours()
  const minute = today.getMinutes()
  const redLinePosition = renderPixel(hour + ':' + minute)

  timelinePart.each(function () {
    const dataTime = $(this).attr('data-time')
    const dataDuration = $(this).attr('data-duration')
    const timelineContent = $(this).find('.m-timeline_content')
    const pixel = renderPixel(dataTime)
    $(this).css({
      width: widthLine,
      top: pixel + 'px',
      opacity: 1,
    })

    timelineContent.css({
      minHeight: dataDuration - 8 + 'px'
    })
  })

  breakPart.each(function () {
    const dataTime = renderPixel($(this).attr('data-time'))
    const dataTimeParent = renderPixel($(this).parent().attr('data-time'))
    $(this).css({
      width: widthLine,
      top: dataTime - dataTimeParent + 'px',
      opacity: 1,
    })
  })

  redLine.css({
    width: widthLine,
    top: redLinePosition + 'px',
    opacity: 1,
  })

})

$('a[data-toggle="tab"]').on('shown.bs.tab', function (e) {
  const dataTrigger = $(this).attr('data-trigger')
  dataTrigger === 'schedule' && timeline.trigger('load')
})

/**
 * show hide group on time line
 */

function filterGroup() {
  const btnGroup = $('.m-group_list button')
  const openModal = $('.openModal')
  const openTooltip = $('.openTooltip')
  const timelineModal = $('.m-timeline_modal')
  const closeSession = $('.closeSession')
  // filter group
  btnGroup.on('click', function (e) {
    e.preventDefault()
    const groupName = $(this).attr('data-name')
    if (groupName) {
      if (groupName == 'all') {
        $('.m-timeline_part').css('opacity', 1)
      } else {
        $('.m-timeline_part').css('opacity', 0)
        $('.m-timeline_part.' + groupName).css('opacity', 1)
      }
    }
  })

  // open Modal
  openModal.on('click', function() {
    const dataTime = $(this).attr('data-time')
    const pixel = renderPixel(dataTime)
    timelineModal.css({
      'top': pixel + 'px',
      'display': 'block',
    })
  })

  // open Tooltip
  openTooltip.on('click', function() {
    const tooltip = $('.m-timeline_part-tooltip')
    tooltip.css({
      'opacity': 0,
      'visibility': 'hidden',
    })
    $(this).find('.m-timeline_part-tooltip').css({
      'opacity': 1,
      'visibility': 'visible',
    })
  })

  closeSession.on('click', function() {
    timelineModal.css({
      'display': 'none',
    })
  })

}

/**
 * set background based on attribute data-bg
 */

function setBackground() {
  $('.setBg').each(function() {
    const dataAttr = $(this).attr('data-bg')
    if (dataAttr) {
      $(this).css('backgroundColor', dataAttr)
    }
  })
}

/**
 * show number in session
 */

function showSessionNumber() {
  $('.m-session').each(function() {
    const number = $(this).next().find('.m-session_number');
    const checkboxes = $(this).find('input[type=checkbox]');
    const showItem = $(this).next();

    checkboxes.on('change', function() {
      const thisCount = checkboxes.filter(':checked').length;
      if (thisCount > 0) {
        number.text('(' +thisCount+ ')');
        showItem.addClass('has-item');
      } else {
        number.text('');
        showItem.removeClass('has-item');
      }
    })
  })

}

/**
 * active session
 */

function toggleSession() {
  $('.btn-add--session').on('click', function() {
    const session = $(this).prev();
    const isActive = session.hasClass('active');
    if (isActive) {
      session.removeClass('active');
    } else {
      $('.m-session').removeClass('active');
      session.addClass('active');
    }
  })
}

/**
 * active tr element if checkbox is checked
 */

function checkChecked() {
  $('.m-allvideo_table-tr').each(function() {
    const self = $(this);
    const checkboxes = $(this).find('.col1 input[type=checkbox]')
    checkboxes.on('change', function() {
      const checked = checkboxes.is(':checked')
      console.log(checked);
      if (checked) {
        self.addClass('checked')
      } else {
        self.removeClass('checked')
      }
    })
  })
}

/**
 * check string length
 */

function checkStringLen() {
  const element = document.getElementsByClassName('trimString')
  for (let i = 0; i < element.length; i++) {
    const len = element[i].innerHTML.length;
    const maxLen = 25;
    if (len > maxLen) {
      element[i].innerHTML = element[i].innerHTML.substring(0, maxLen) + '...'
    } else {
      element[i].innerHTML = element[i].innerHTML
    }
  }
}

/**
 *
 */

filterGroup()
setBackground()
showSessionNumber()
toggleSession()
checkChecked()
checkStringLen()

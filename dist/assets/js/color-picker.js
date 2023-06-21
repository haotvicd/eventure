const pickerButton = $('.pickerButton');

/**
 * toggle show hide
 */

pickerButton.each(function() {
  const pickerModal = $(this).parent().next('.pickerModal');
  const pickerButtonClose = pickerModal.find('.pickerButtonClose');

  $(this).on('click', function(e) {
    e.preventDefault();
    pickerModal.toggleClass('active');
  })

  pickerButtonClose.on('click', function(e) {
    e.preventDefault();
    pickerModal.removeClass('active');
  });

})

/**
 * get value
 */

const pickerModal = $('.pickerModal');
pickerModal.each(function() {
  var hue = $(this).find('input.hue');
  var hueVal = hue.val();
  var sat = $(this).find('input.sat');
  var satVal = sat.val();
  var light = $(this).find('input.light');
  var lightVal = light.val();
  var showColor = $(this).find('.hex .color');
  var showHex = $(this).find('.showHex');

  const regexHue = new RegExp('^(?:36[0]|3[0-5][0-9]|[12][0-9][0-9]|[1-9]?[0-9])?$');
  const regexSL = new RegExp('^[1-9][0-9]?$|^100$');

  $(this).find('input.hue').on('input', function() {
    let thisVal = $(this).val();
    hueVal = thisVal;
    $(this).next('.showHue').val(thisVal);
    sat.css('background', `linear-gradient(to right, hsl(${hueVal},0%,${lightVal}%) 0%, hsl(${hueVal},100%,${lightVal}%) 100%)`);
    light.css('background', `linear-gradient(to right, #000 0%, hsl(${hueVal},${satVal}%,50%) 50%, #fff 100%)`);
    showColor.css('background-color', `hsl(${hueVal}, ${satVal}%, ${lightVal}%)`);
    showHex.text(HSLToHex(hueVal, satVal, lightVal));
  })

  $(this).find('input.sat').on('input', function() {
    let thisVal = $(this).val();
    satVal = thisVal;
    $(this).next('.showSat').val(thisVal);
    showColor.css('background-color', `hsl(${hueVal}, ${satVal}%, ${lightVal}%)`);
    showHex.text(HSLToHex(hueVal, satVal, lightVal));
  })

  $(this).find('input.light').on('input', function() {
    let thisVal = $(this).val();
    lightVal = thisVal;
    $(this).next('.showLight').val(thisVal);
    showColor.css('background-color', `hsl(${hueVal}, ${satVal}%, ${lightVal}%)`);
    showHex.text(HSLToHex(hueVal, satVal, lightVal));
  })

  $(this).find('input.showHue').on('input', function() {
    let thisVal = $(this).val();
    if (regexHue.test(thisVal) && thisVal !== '') {
      hueVal = thisVal;
      hue.val(thisVal);
      $(this).removeClass('error');
      sat.css('background', `linear-gradient(to right, hsl(${hueVal},0%,${lightVal}%) 0%, hsl(${hueVal},100%,${lightVal}%) 100%)`);
      light.css('background', `linear-gradient(to right, #000 0%, hsl(${hueVal},${satVal}%,50%) 50%, #fff 100%)`);
      showColor.css('background-color', `hsl(${hueVal}, ${satVal}%, ${lightVal}%)`);
      showHex.text(HSLToHex(hueVal, satVal, lightVal));
    } else {
      $(this).addClass('error');
      return false;
    }
  })

  $(this).find('input.showSat').on('input', function() {
    let thisVal = $(this).val();
    if (regexSL.test(thisVal) && thisVal !== '') {
      satVal = thisVal;
      sat.val(thisVal);
      $(this).removeClass('error');
      showColor.css('background-color', `hsl(${hueVal}, ${satVal}%, ${lightVal}%)`);
      showHex.text(HSLToHex(hueVal, satVal, lightVal));
    } else {
      $(this).addClass('error');
      return false;
    }
  })

  $(this).find('input.showLight').on('input', function() {
    let thisVal = $(this).val();
    if (regexSL.test(thisVal) && thisVal !== '') {
      lightVal = thisVal;
      light.val(thisVal);
      $(this).removeClass('error');
      showColor.css('background-color', `hsl(${hueVal}, ${satVal}%, ${lightVal}%)`);
      showHex.text(HSLToHex(hueVal, satVal, lightVal));
    } else {
      $(this).addClass('error');
      return false;
    }
  })

})

function HSLToHex(h, s, l) {
  s /= 100;
  l /= 100;

  let c = (1 - Math.abs(2 * l - 1)) * s,
    x = c * (1 - Math.abs((h / 60) % 2 - 1)),
    m = l - c / 2,
    r = 0,
    g = 0,
    b = 0;

  if (0 <= h && h < 60) {
    r = c; g = x; b = 0;
  } else if (60 <= h && h < 120) {
    r = x; g = c; b = 0;
  } else if (120 <= h && h < 180) {
    r = 0; g = c; b = x;
  } else if (180 <= h && h < 240) {
    r = 0; g = x; b = c;
  } else if (240 <= h && h < 300) {
    r = x; g = 0; b = c;
  } else if (300 <= h && h < 360) {
    r = c; g = 0; b = x;
  }
  // Having obtained RGB, convert channels to hex
  r = Math.round((r + m) * 255).toString(16);
  g = Math.round((g + m) * 255).toString(16);
  b = Math.round((b + m) * 255).toString(16);

  // Prepend 0s, if necessary
  if (r.length == 1)
    r = "0" + r;
  if (g.length == 1)
    g = "0" + g;
  if (b.length == 1)
    b = "0" + b;

  return "#" + r + g + b;
}
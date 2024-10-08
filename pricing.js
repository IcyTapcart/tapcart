function calc_d_num(num) {
  var num, d_num;
  if (num <= 30) {
    d_num = num / 10;
  } else if (num <= 50) {
    d_num = (num - 30) * 0.35 + 3;
  } else if (num <= 70) {
    d_num = (num - 50) * 2 + 10;
  } else if (num <= 100) {
    d_num = ((num - 70) * 5) / 3 + 50;
  }
  d_num = parseFloat(d_num.toFixed(3));
  return d_num === 0 ? d_num : d_num + "M";
}

function sliderOnChange(data) {
  var convertedRev;
  data.from_pretty = parseFloat(data.from_pretty);
  if (data.from_pretty == 0) {
    document.getElementById("AnnualRevenue").innerHTML = "&nbsp;-";
  } else if (data.from_pretty < 1) {
    convertedRev = parseFloat((data.from_pretty * 1000).toFixed(1)) + "k";
    $("#AnnualRevenue").text(convertedRev);
  } else {
    convertedRev = parseFloat(data.from_pretty.toFixed(1)) + "M";
    $("#AnnualRevenue").text(convertedRev);
  }

  var Ba = data.from_pretty * 0.11;
  var Bb = (Ba / 0.11) * 0.225;
  if (Ba < 1) {
    $(".gmv-in-card").text("$" + parseFloat((Ba * 1000).toFixed(1)) + "k");
  } else {
    $(".gmv-in-card").text("$" + parseFloat(Ba.toFixed(1)) + "M");
  }

  if (Bb == 0) {
    $("#GMVhigh, #dollarSign").hide();
    $(".gmv-in-card").text("$");
  } else {
    $("#GMVhigh, #dollarSign").show();
  }

  if (Bb < 1) {
    $("#GMVhigh").text(parseFloat((Bb * 1000).toFixed(1)) + "k");
  } else {
    $("#GMVhigh").text(parseFloat(Bb.toFixed(1)) + "M");
  }
  var gmv = Ba * 1000000;
  var Bb_gmv = Bb * 1000000;

  var c1, c2, c3, c1b, c2b, c3b;
  c1 = 200 + ((Ba * 1000000) / 12) * 0.025;
  c1b = 200 + ((Bb * 1000000) / 12) * 0.025;

  // v4 temp update week of August 31 only:
  c2 = 400 + ((Ba * 1000000) / 12) * 0.025;
  c2b = 400 + ((Bb * 1000000) / 12) * 0.025;
  c3 = 1000 + ((Ba * 1000000) / 12) * 0.0175;
  c3b = 1000 + ((Bb * 1000000) / 12) * 0.0175;

  if (data.from_pretty == 0) {
    $(".new-price-card.core").removeClass("disabled-card");
    $(".new-price-card.ultimate").removeClass("disabled-card");
    $(".annual-revenue-over-maximum").hide();
    $(".annual-revenue-under-maximum").hide();
    $(".annual-revenue-zero").show();
    $(".new-price-card.core").removeClass("focus");
    $(".new-price-card.ultimate").removeClass("focus");
    $(".new-price-card.enterprise").removeClass("focus");
    $(".new-pricing-wrap").removeClass("ride");
    $(".price-mark-wrap").hide();
    $(".price-recommended-tag").hide();
    $(".new-price-card.core").removeClass("enterprise-focus");
    $(".new-price-card.ultimate").removeClass("enterprise-focus");
    $(".inner-card-wrap.enterprise").removeClass("focus");
  } else if (data.from_pretty > 0 && data.from_pretty < 1) {
    $(".new-price-card.core").removeClass("disabled-card");
    $(".new-price-card.ultimate").removeClass("disabled-card");
    $(".annual-revenue-over-maximum").hide();
    $(".annual-revenue-zero").hide();
    $(".annual-revenue-under-maximum").show();
    $(".new-price-card.core").addClass("focus");
    $(".new-price-card.ultimate").removeClass("focus");
    $(".new-price-card.enterprise").removeClass("focus");
    $(".new-pricing-wrap").addClass("ride");
    $(".price-mark-wrap").hide();
    $(".price-recommended-tag").hide();
    $(".price-recommended-tag.core").show();
    $(".new-price-card.core").removeClass("enterprise-focus");
    $(".new-price-card.ultimate").removeClass("enterprise-focus");
    $(".inner-card-wrap.enterprise").removeClass("focus");
    $(".plan-name").hide();
    $(".plan-name.core-plan").show();
    $("#MonthlyFee1").text(Math.trunc(c1).toLocaleString("en-US"));
  } else if (data.from_pretty >= 1 && data.from_pretty < 10) {
    $(".new-price-card.ultimate").removeClass("disabled-card");
    $(".new-price-card.core").addClass("disabled-card");
    $(".annual-revenue-over-maximum").hide();
    $(".annual-revenue-zero").hide();
    $(".annual-revenue-under-maximum").show();
    $(".new-price-card.core").removeClass("focus");
    $(".new-price-card.ultimate").addClass("focus");
    $(".new-price-card.enterprise").removeClass("focus");
    $(".new-pricing-wrap").addClass("ride");
    $(".price-mark-wrap").hide();
    $(".price-recommended-tag").hide();
    $(".price-recommended-tag.ultimate").show();
    $(".new-price-card.core").removeClass("enterprise-focus");
    $(".new-price-card.ultimate").removeClass("enterprise-focus");
    $(".inner-card-wrap.enterprise").removeClass("focus");
    $(".plan-name").hide();
    $(".plan-name.ultimate-plan").show();
    $("#MonthlyFee1").text(Math.trunc(c2).toLocaleString("en-US"));
  } else if (data.from_pretty >= 10 && data.from_pretty < 100) {
    if (data.from_pretty >= 20) {
      $(".inner-card-wrap.enterprise").addClass("dt");
      $(".new-price-card.enterprise").addClass("dt");
      $(".combo-cd-wrap.ent.dt").addClass("focus");
      $(".plan-title.enterprise.dt").show();
    } else {
      $(".inner-card-wrap.enterprise").removeClass("dt");
      $(".new-price-card.enterprise").removeClass("dt");
      $(".combo-cd-wrap.ent.dt").removeClass("focus");
      $(".plan-title.enterprise.dt").hide();
    }
    $(".new-price-card.core").addClass("disabled-card");
    $(".new-price-card.ultimate").addClass("disabled-card");
    $(".pricing-sum-up").css("display", "flex");
    $(".annual-revenue-over-maximum").hide();
    $(".annual-revenue-zero").hide();
    $(".annual-revenue-over-maximum.enterprise").show();
    $(".new-pricing-wrap").removeClass("ride");
    $("#MonthlyFee1").text(Math.trunc(c3).toLocaleString("en-US"));
  } else if (data.from_pretty >= 100) {
    $(".annual-revenue-over-maximum").show();
    $(".annual-revenue-zero").hide();
    $(".pricing-sum-up").hide();
  }

  if (data.from_pretty < 10) {
    $("#tour").show();
  } else {
    $(".plan-name").hide();
    $(".plan-name.enterprise-plan").show();
    $("#tour").hide();
    $(".new-price-card.core").removeClass("focus");
    $(".new-price-card.ultimate").removeClass("focus");
    $(".new-price-card.enterprise").addClass("focus");
    $(".price-mark-wrap").show();
    $(".price-recommended-tag").hide();
    $(".price-recommended-tag.enterprise").show();
    $(".new-price-card.core").addClass("enterprise-focus");
    $(".new-price-card.ultimate").addClass("enterprise-focus");
    $(".inner-card-wrap.enterprise").addClass("focus");
    $(".annual-revenue-under-maximum").hide();
  }

  $("#c1").text("$" + Math.trunc(c1).toLocaleString("en-US"));
  $("#c2").text("$" + Math.trunc(c2).toLocaleString("en-US"));
  $("#c3").text("$" + Math.trunc(c3).toLocaleString("en-US"));
  $("#c1b").text("$" + Math.trunc(c1b).toLocaleString("en-US"));
  $("#c2b").text("$" + Math.trunc(c2b).toLocaleString("en-US"));
  $("#c3b").text("$" + Math.trunc(c3b).toLocaleString("en-US"));

  console.log(c1b, c2b, c3)

  $(".sms-savings.high").text(
    parseFloat(
      ((data.from_pretty * 1000000 * 0.002) / 12).toFixed(0)
    ).toLocaleString("en-US")
  );
  $(".sms-savings.low").text(
    parseFloat(
      ((data.from_pretty * 1000000 * 0.0009) / 12).toFixed(0)
    ).toLocaleString("en-US")
  );
}

function sliderOnStart() {
  var val;
  $(".irs-grid-text").each(function () {
    val = $(this).text();
    if (
      val !== "0" &&
      val !== "1M" &&
      val !== "3M" &&
      val !== "10M" &&
      val !== "50M" &&
      val !== "100M"
    ) {
      $(this).text("");
    }
    $(".irs-grid-pol.small").hide();
    $(
      '.irs-grid-pol[style*="left: 20%"], .irs-grid-pol[style*="left: 40%"], .irs-grid-pol[style*="left: 60%"], .irs-grid-pol[style*="left: 80%"], .irs-grid-pol[style*="left: 90%"]'
    ).hide();
  });
}

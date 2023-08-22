function calc_d_num(num) {
  console.log("calc_d_num loaded from gh");
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

  var Ba = data.from_pretty * 0.129;
  var Bb = (Ba / 0.129) * 0.225;
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

  // C2
  if (gmv < 27000) {
    c2 = 400 + (gmv / 12) * 0.025;
  } else if (gmv >= 27000 && gmv < 108000) {
    c2 = 400 + (gmv / 12) * 0.0225;
  } else if (gmv >= 108000 && gmv < 264000) {
    c2 = 400 + (gmv / 12) * 0.02;
  } else if (gmv >= 264000 && gmv < 504000) {
    c2 = 400 + (gmv / 12) * 0.019;
  } else if (gmv >= 504000) {
    c2 = 400 + (gmv / 12) * 0.018;
  }
  if (Bb_gmv < 27000) {
    c2b = 400 + (Bb_gmv / 12) * 0.025;
  } else if (Bb_gmv >= 27000 && Bb_gmv < 108000) {
    c2b = 400 + (Bb_gmv / 12) * 0.0225;
  } else if (Bb_gmv >= 108000 && Bb_gmv < 264000) {
    c2b = 400 + (Bb_gmv / 12) * 0.02;
  } else if (Bb_gmv >= 264000 && Bb_gmv < 504000) {
    c2b = 400 + (Bb_gmv / 12) * 0.019;
  } else if (Bb_gmv >= 504000) {
    c2b = 400 + (Bb_gmv / 12) * 0.018;
  }

  // C3
  if (gmv < 2640000) {
    c3 = 1000 + (gmv / 12) * 0.0175;
  } else if (gmv >= 2640000 && gmv < 5040000) {
    c3 = 1000 + (gmv / 12) * 0.016;
  } else if (gmv >= 5040000) {
    c3 = 1000 + (gmv / 12) * 0.015;
  }
  if (Bb_gmv < 2640000) {
    c3b = 1000 + (Bb_gmv / 12) * 0.0175;
  } else if (Bb_gmv >= 2640000 && Bb_gmv < 5040000) {
    c3b = 1000 + (Bb_gmv / 12) * 0.016;
  } else if (Bb_gmv >= 5040000) {
    c3b = 1000 + (Bb_gmv / 12) * 0.015;
  }

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
  } else if (data.from_pretty >= 1 && data.from_pretty < 3) {
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
  } else if (data.from_pretty >= 3 && data.from_pretty < 100) {
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

  if (data.from_pretty < 3) {
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

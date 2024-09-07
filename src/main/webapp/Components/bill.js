$(document).ready(function() {
	$("#alertSuccess").hide();
	$("#alertError").hide();
});

// SAVE ============================================
$(document).on("click", "#btnSave", function(event) {
	// Clear alerts---------------------
	$("#alertSuccess").text("");
	$("#alertSuccess").hide();
	$("#alertError").text("");
	$("#alertError").hide();

	// Form validation-------------------
	var status = validateBillForm();
	if (status != true) {
		$("#alertError").text(status);
		$("#alertError").show();
		return;
	}

	// If valid------------------------
	var type = ($("#hidBillIDSave").val() == "") ? "POST" : "PUT";

	$.ajax({
		url : "BillAPI",
		type : type,
		data : $("#formBill").serialize(),
		dataType : "text",
		complete : function(response, status) {
			onBillSaveComplete(response.responseText, status);
		}
	});
});

function onBillSaveComplete(response, status) {
	if (status == "success") {
		var resultSet = JSON.parse(response);

		if (resultSet.status.trim() == "success") {
			$("#alertSuccess").text("Successfully saved.");
			$("#alertSuccess").show();

			$("#divBillGrid").html(resultSet.data);
		} else if (resultSet.status.trim() == "error") {
			$("#alertError").text(resultSet.data);
			$("#alertError").show();
		}

	} else if (status == "error") {
		$("#alertError").text("Error while saving.");
		$("#alertError").show();
	} else {
		$("#alertError").text("Unknown error while saving..");
		$("#alertError").show();
	}

	$("#hidBillIDSave").val("");
	$("#formBill")[0].reset();
}

// UPDATE==========================================
$(document).on(
		"click",
		".btnUpdate",
		function(event) {
			$("#hidBillIDSave").val(
					$(this).closest("tr").find('#hidBillIDUpdate').val());
			$("#bName").val($(this).closest("tr").find('td:eq(0)').text());
			$("#bDate").val($(this).closest("tr").find('td:eq(1)').text());
			$("#accNo").val($(this).closest("tr").find('td:eq(2)').text());
			$("#preReading").val($(this).closest("tr").find('td:eq(1)').text());
			$("#currentReading").val($(this).closest("tr").find('td:eq(2)').text());
		});

// REMOVE===========================================
$(document).on("click", ".btnRemove", function(event) {
	$.ajax({
		url : "BillAPI",
		type : "DELETE",
		data : "billID=" + $(this).data("billID"),
		dataType : "text",
		complete : function(response, status) {
			onBillDeleteComplete(response.responseText, status);
		}
	});
});

function onBillDeleteComplete(response, status) {
	if (status == "success") {
		var resultSet = JSON.parse(response);

		if (resultSet.status.trim() == "success") {

			$("#alertSuccess").text("Successfully deleted.");
			$("#alertSuccess").show();

			$("#divBillGrid").html(resultSet.data);

		} else if (resultSet.status.trim() == "error") {
			$("#alertError").text(resultSet.data);
			$("#alertError").show();
		}

	} else if (status == "error") {
		$("#alertError").text("Error while deleting.");
		$("#alertError").show();
	} else {
		$("#alertError").text("Unknown error while deleting..");
		$("#alertError").show();
	}
}

// CLIENT-MODEL=========================================================================
function validateBillForm() {
	// NAME
	if ($("#bName").val().trim() == "") {
		return "Insert Bill Name.";
	}

	// Date------------------------
	if ($("#bDate").val().trim() == "") {
		return "Insert Date.";
	}

	// Bill number------------------------
	 var tmpPrice = $("#accNo").val().trim();
	 if (!$.isNumeric(tmpPrice)) 
	 {
		 return "Insert Account Number.";
	 }
	
		// Pre Reading------------------------
	 var tmpPrice = $("#preReading").val().trim();
	 if (!$.isNumeric(tmpPrice)) 
	 {
		 return "Insert Last Reading.";
	 }
	 
	 	// Current Reading------------------------
	 var tmpPrice = $("#currentReading").val().trim();
	 if (!$.isNumeric(tmpPrice)) 
	 {
		 return "Insert Current Reading.";
	 }

	return true;
}
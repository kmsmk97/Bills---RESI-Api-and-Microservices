<%@page import="com.Bill"%>
<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
    pageEncoding="ISO-8859-1"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="ISO-8859-1">
<title>Insert title here</title>
<link rel="stylesheet" href="Views/bootstrap.min.css">
<script src="Components/jquery-3.4.1.min.js"></script>
<script src="Components/bill.js"></script>
</head>
<body>
	<div class="container">
		<div class="row">
			<div class="col-6">
				<h1>Product Service</h1>

				<form id="formBill" name="formBill" method="post" action="Bill.jsp">


						Consumer Name :
						<input id="bName" name="bName" type="text"
						class="form-control form-control-sm"> 
						
						<br>Date: 
						<input id="bDate" name="bDate" type="text"
						class="form-control form-control-sm"> 
						
						<br> Account Number : 
						<input id="accNo" name="accNo" type="text"
						class="form-control form-control-sm"> 
						
						<br> Last Reading : 
						<input id="preReading" name="preReading" type="text"
						class="form-control form-control-sm"> 
						
						<br> Current Reading : 
						<input id="currentReading" name="currentReading" type="text"
						class="form-control form-control-sm"> 
						
						<br> <input
						id="btnSave" name="btnSave" type="button" value="Save"
						class="btn btn-primary"> <input type="hidden"
						id="hidBillIDSave" name="hidBillIDSave" value="">
				</form>

				<div id="alertSuccess" class="alert alert-success"></div>
				<div id="alertError" class="alert alert-danger"></div>

				<br>
				<div id="divBillGrid">
					<%
						Bill billObj = new Bill();
						out.print(billObj.readBills());
					%>
				</div>
			</div>
		</div>
	</div>
</body>
</html>
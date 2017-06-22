<%@ Page Title="Phone Selection Page" Language="C#" MasterPageFile="~/Site.Master" AutoEventWireup="true" Inherits="System.Web.Mvc.ViewPage" %>

<asp:Content ID="BodyContent" ContentPlaceHolderID="MainContent" runat="server">

    <%--MasterPageFile="~/Site1.Master"--%>

<%--<asp:Content ID="homeHead" ContentPlaceHolderID="head" runat="server"></asp:Content>

<asp:Content ID="homeBody" ContentPlaceHolderID="ContentPlaceHolder1" runat="server"></asp:Content>--%>
<link rel="stylesheet" href="/Content/phone-selector.css">

<script src="/Content/Global/js/Phone App/phone-app.js"></script>
<script src="/Content/Global/js/Phone App/directives/login.js"></script>
<script src="/Content/Global/js/Phone App/directives/phone-selector.js"></script>

<script>
    offerFromSession = <%= Session["offer"] != null ? Session["offer"] : "null" %>
    function sendEmail() {
        $.ajax({
            type: "POST",
            url: 'http://localhost/Home/SendEmail',
            data: { emailTo: 'efriedman92@gmail.com', name: 'Eli'}
        });
    }
</script>

 

<head>
    <title></title>
</head>
    
<body>
    
    
    <div ng-app="phoneApp" ng-controller="phoneAppController">
        <div onclick="sendEmail()">yo</div>
        <input ng-model="offerFromSession" /><div>{{offer}}a</div>
        <phone-selector ng-show="offer == null" phone-data="phoneData" update-offer="updateOffer(offer)"></phone-selector>
        <login ng-if="offer != null" phone-data="phoneData"></login>

         
    </div>

   
<%--    <div style='position: absolute; z-index: -1; left: 0; top: 0; width: 100%; height: 400px'>--%>
    
<%--    </div>--%>

    

</body>

</asp:Content>

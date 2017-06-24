<%@ Page Title="Phone Selection Page" Language="C#" MasterPageFile="~/Site.Master" AutoEventWireup="true" Inherits="System.Web.Mvc.ViewPage" %>

<asp:Content ID="BodyContent" ContentPlaceHolderID="MainContent" runat="server">

    <%--MasterPageFile="~/Site1.Master"--%>

<%--<asp:Content ID="homeHead" ContentPlaceHolderID="head" runat="server"></asp:Content>

<asp:Content ID="homeBody" ContentPlaceHolderID="ContentPlaceHolder1" runat="server"></asp:Content>--%>
<link rel="stylesheet" href="/Content/phone-selector.css">

<script src="/Content/Global/js/Phone App/phone-app.js"></script>
<script src="/Content/Global/js/Phone App/directives/login/login.js"></script>
<script src="/Content/Global/js/Phone App/directives/phone-selector/phone-selector.js"></script>
<script src="/Content/Global/js/Phone App/directives/offer/offer.js"></script>
<script src="/Content/Global/js/Phone App/directives/offer/select-pickup/select-pickup.js"></script>

<script>
    offerFromSession = <%= Session["offer"] != null ? Session["offer"] : "null" %>
    loggedIn = <%= HttpContext.Current.User.Identity.IsAuthenticated ? "true" : "false" %>
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
        <div>{{subTitle}}</div>
        <div onclick="sendEmail()">yo</div>
        <input ng-model="offerFromSession" /><div>{{offer}}a</div>
        <phone-selector ng-if="offer == null" update-title="updateTitle(subTitle)" phone-data="phoneData" update-offer="updateOffer(offer)"></phone-selector>
        <login ng-if="offer != null && !loggedIn" phone-data="phoneData"></login>
        <offer ng-if="offer != null && loggedIn" update-title="updateTitle(subTitle)" phone-data="phoneData"></offer>
         
    </div>

   
<%--    <div style='position: absolute; z-index: -1; left: 0; top: 0; width: 100%; height: 400px'>--%>
    
<%--    </div>--%>

    

</body>

</asp:Content>

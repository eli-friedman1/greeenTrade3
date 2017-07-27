<%@ Page Title="Home Page" Language="C#" MasterPageFile="~/Site.Master" AutoEventWireup="true" Inherits="System.Web.Mvc.ViewPage" %>

<asp:Content ID="BodyContent" ContentPlaceHolderID="MainContent" runat="server">

    <%--MasterPageFile="~/Site1.Master"--%>

<%--<asp:Content ID="homeHead" ContentPlaceHolderID="head" runat="server"></asp:Content>

<asp:Content ID="homeBody" ContentPlaceHolderID="ContentPlaceHolder1" runat="server"></asp:Content>--%>
<script src="/Content/Global/js/ng-zip-input.js"></script>

<script>
    function submitZip() {
        window.location = ("/PhoneSelection");
    }
</script>
<script>
    phoneDataFromSession = {
        brandSelected: <%= Session["brand"] != null ? "\"" + Session["brand"] + "\"" : "null" %>,
        seriesSelected: <%= Session["series"] != null ? "\"" + Session["series"] + "\"" : "null" %>,
        carrierSelected: <%= Session["carrier"] != null ? "\"" + Session["carrier"] + "\"" : "null" %>,
        colorSelected: <%= Session["color"] != null ? "\"" + Session["color"] + "\"" : "null" %>,
        GBSelected: <%= Session["GB"] != null ? Session["GB"] : "null" %>,
        conditionSelected: <%= Session["condition"] != null ? "\"" + Session["condition"] + "\"" : "null" %>,
        offer : <%= Session["offer"] != null ? Session["offer"] : "null" %>
    };
    loggedIn = <%= HttpContext.Current.User.Identity.IsAuthenticated ? "true" : "false" %>;
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
    <%--<script type="text/javascript">    
    /**
     * You must include the dependency on 'ngMaterial' 
     */
    angular.module('ngPhoneSelector', ['ngMaterial']);
  </script>--%>
   <%-- <div style='position: absolute; z-index: -1; left: 0; top: 0; width: 100%; height: 400px'>
        <img src='\Content\Global\hd-wallpapers-image-16.jpg' style='width: 100%; height: 100%' alt='[]' />
    </div>--%>

    

<%--    <div ng-app="ngZipInput">
        
        <div class="home-top">
            <div class="home-nav-container" layout="row" layout-align="space-around start">

                <div class="home-nav-links" layout="row" layout-align="center start">
                    <md-button class="home-nav-button">How it works</md-button>
                    <md-button class="home-nav-button">Why choose Greentrade?</md-button>
                    <md-button class="home-nav-button">FAQ's</md-button>
                </div>
                
            </div>
            <div class="zip-select-container" layout="column" layout-align="center center">
                <div class="pickup-text" layout="column" layout-align="center center">
                    <span>Pick-up and payment for</span> 
                    <span>your unwanted phone</span>
                </div>
                
                <span layout="row" layout-align="center start">
                    <md-input-container class="zip-input">
                        <input type="text" ng-model="zip" maxlength="5" placeholder="Your Zip Code">
                    </md-input-container>
                    <md-button onclick="submitZip()" class="zip-submit">Let's GreenTrade</md-button>
                </span>

                
            </div>
        </div>

        
         
    </div>--%>
    

     <div ng-view></div> 
    
<%--    <div style='position: absolute; z-index: -1; left: 0; top: 0; width: 100%; height: 400px'>--%>
    
<%--    </div>--%>

    

</body>

</asp:Content>

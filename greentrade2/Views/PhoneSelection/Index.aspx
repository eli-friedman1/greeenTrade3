<%@ Page Title="Phone Selection Page" Language="C#" MasterPageFile="~/Site.Master" AutoEventWireup="true" Inherits="System.Web.Mvc.ViewPage" %>

<asp:Content ID="BodyContent" ContentPlaceHolderID="MainContent" runat="server">

    <%--MasterPageFile="~/Site1.Master"--%>

<%--<asp:Content ID="homeHead" ContentPlaceHolderID="head" runat="server"></asp:Content>

<asp:Content ID="homeBody" ContentPlaceHolderID="ContentPlaceHolder1" runat="server"></asp:Content>--%>


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
        
    
       
    

   
<%--    <div style='position: absolute; z-index: -1; left: 0; top: 0; width: 100%; height: 400px'>--%>
    
<%--    </div>--%>

    

</body>

</asp:Content>

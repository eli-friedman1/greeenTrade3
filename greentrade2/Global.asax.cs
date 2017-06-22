using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Web.Optimization;
using System.Web.Routing;
using System.Web.Security;
using System.Web.SessionState;

namespace greentrade2
{
    public class Global : HttpApplication
    {
        void Application_Start(object sender, EventArgs e)
        {
            // Code that runs on application startup
            AreaRegistration.RegisterAllAreas();
            RouteConfig.RegisterRoutes(RouteTable.Routes);
            BundleConfig.RegisterBundles(BundleTable.Bundles);

            //   AreaRegistration.RegisterAllAreas();
            ////   FilterConfig.RegisterGlobalFilters(GlobalFilters.Filters);
            //   RouteConfig.RegisterRoutes(RouteTable.Routes);
            //   BundleConfig.RegisterBundles(BundleTable.Bundles);
            //ViewEngines.Engines.Clear();
            //ViewEngines.Engines.Add(new RazorViewEngine());
            //ViewEngines.Engines.Add(new WebFormViewEngine());
        }
    }
}
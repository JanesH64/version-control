package com.dvelop.versioncontrol.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
public class ViewController {

@RequestMapping({ "/repositories",})
   public String index() {
       return "forward:/index.html";
   }
}

Logo image--https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTk7o4QNN2c-szF5MBK1FEA0ksJ57pq9AwULg&s




---------------------------------------------------Html footer-------------------------------
 <footer>
        <div class="footer-section">
          <h3>Contact Us</h3>
          <ul>
            <li>Address: Kop Maharastra, India</li>
            <li>Phone: +918819456500</li>
            <li>Email: <a href="mailto:info@example.com">Novafashionwear.com</a></li>
          </ul>
        </div>
        <div class="footer-section">
          <h3>Quick Links</h3>
          <ul>
            <li><a href="#">About Us</a></li>
            <li><a href="#">FAQ</a></li>
            <li><a href="#">Terms & Conditions</a></li>
          </ul>
        </div>
        <div class="footer-section">
          <h3>Follow Us</h3>
          <ul>
            <li><a href="#" target="_blank"><i class="fa-brands fa-facebook"></i> Facebook</a></li>
            <li><a href="#" target="_blank"><i class="fa-brands fa-twitter"></i> Twitter</a></li>
            <li><a href="#" target="_blank"><i class="fa-brands fa-instagram"></i> Instagram</a></li>
          </ul>
        </div>
        <div class="copyright">
          <p>&copy; 2024 Your Company Name. All rights reserved.</p>
        </div>
      </footer>



_________________________Css footer_________________________________________
* {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }
  
  body {
    font-family: Arial, sans-serif;
    line-height: 1.6;
    color: #333;
    background-color: #f9f9f9;
  }
  footer {
    background-color: #0b0b0b;
    color: #fff;
    padding: 20px 0;
    text-align: center;
  }
  
  .footer-section {
    display: inline-block;
    vertical-align: top;
    width: 30%;
    margin: 0 20px;
  }
  
  .footer-section h3 {
    font-size: 18px;
    margin-bottom: 10px;
  }
  
  .footer-section ul {
    list-style: none;
    padding: 0;
    margin: 0;
  }
  
  .footer-section li {
    margin-bottom: 10px;
  }
  
  .footer-section a {
    color: #fff;
    text-decoration: none;
  }
  
  .footer-section a:hover {
    color: #ccc;
  }
  
  .copyright {
    clear: both;
    padding: 10px 0;
    font-size: 14px;
    color: #666;
  }
  @media (max-width: 1200px) {
    .footer-section {
      width: 25%;
    }
  }
  @media (max-width: 992px) {
    .footer-section {
      width: 33.33%;
    }
  }
  @media (max-width: 768px) {
    .footer-section {
      display: block;
      width: 100%;
      margin: 0 0 20px;
    }
  }
  @media (max-width: 480px) {
    .footer-section h3 {
      font-size: 16px;
    }
    .footer-section li {
      margin-bottom: 5px;
    }
    .copyright {
      font-size: 12px;
    }
  }

    

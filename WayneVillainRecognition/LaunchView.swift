//
//  LaunchView.swift
//  WayneVillainRecognition
//
//  Created by Rigel on 4/23/18.
//  Copyright © 2018 Rigel. All rights reserved.
//

import UIKit

class LaunchView: UIView {
  
  let wayneLogo: UIImageView = {
    let imageView = UIImageView()
    imageView.image = UIImage(named: "Wayne_Enterprise_by_RurouniVash.jpg")
    imageView.translatesAutoresizingMaskIntoConstraints = false
    return imageView
  }()
  
  let villainImage: UIImageView = {
    let imageView = UIImageView()
    imageView.backgroundColor = UIColor.gray
    imageView.layer.cornerRadius = 5
    imageView.contentMode = .scaleAspectFill
    
    imageView.translatesAutoresizingMaskIntoConstraints = false
    return imageView
  }()
  
  let selectVillainImageButton: UIButton = {
    let button = UIButton(type: .system)
    button.setTitle("Select Image", for: .normal)
    button.setTitleColor(UIColor.white, for: .normal)
    button.titleLabel?.font = UIFont.boldSystemFont(ofSize: 16)
    button.layer.borderColor = UIColor.gray.cgColor
    button.layer.borderWidth = 1
    button.translatesAutoresizingMaskIntoConstraints = false
    button.layer.cornerRadius = 5
    
    return button
  }()
  
  let checkForMatchingVillainButton: UIButton = {
    let button = UIButton(type: .system)
    button.setTitle("Check for matching Villain", for: .normal)
    button.setTitleColor(UIColor.white, for: .normal)
    button.titleLabel?.font = UIFont.boldSystemFont(ofSize: 16)
    button.layer.borderColor = UIColor.gray.cgColor
    button.layer.borderWidth = 1
    button.translatesAutoresizingMaskIntoConstraints = false
    button.layer.cornerRadius = 5
    
    return button
  }()
  
  
  
  
  
  
  
  override init(frame: CGRect) {
    super.init(frame: frame)
    
    //    backgroundColor = UIColor.white
    
    addSubview(wayneLogo)
    addSubview(villainImage)
    addSubview(selectVillainImageButton)
    addSubview(checkForMatchingVillainButton)
    setConstraints()
    
  }
  
  func setConstraints() {
    
    wayneLogo.centerXAnchor.constraint(equalTo: self.centerXAnchor).isActive = true
    //    wayneLogo.centerYAnchor.constraint(equalTo: self.centerYAnchor).isActive = true
    wayneLogo.topAnchor.constraintEqualToSystemSpacingBelow(topAnchor, multiplier: 8.0).isActive = true
    wayneLogo.widthAnchor.constraint(equalTo: widthAnchor, multiplier: 0.7).isActive = true
    wayneLogo.heightAnchor.constraint(equalTo: heightAnchor, multiplier: 0.25).isActive = true
    
    villainImage.topAnchor.constraintEqualToSystemSpacingBelow(wayneLogo.bottomAnchor, multiplier: 2.0).isActive = true
    villainImage.centerXAnchor.constraint(equalTo: centerXAnchor).isActive = true
    villainImage.widthAnchor.constraint(equalTo: widthAnchor, multiplier: 0.5).isActive = true
    villainImage.heightAnchor.constraint(equalTo: villainImage.widthAnchor).isActive = true
    
    selectVillainImageButton.topAnchor.constraintEqualToSystemSpacingBelow(villainImage.bottomAnchor, multiplier: 5.0).isActive = true
    selectVillainImageButton.centerXAnchor.constraint(equalTo: centerXAnchor).isActive = true
    selectVillainImageButton.widthAnchor.constraint(equalTo: widthAnchor, multiplier: 0.6).isActive = true
    selectVillainImageButton.heightAnchor.constraint(equalTo: selectVillainImageButton.widthAnchor, multiplier: 0.2).isActive = true
    
    checkForMatchingVillainButton.topAnchor.constraintEqualToSystemSpacingBelow(selectVillainImageButton.bottomAnchor, multiplier: 2.0).isActive = true
    checkForMatchingVillainButton.centerXAnchor.constraint(equalTo: centerXAnchor).isActive = true
    checkForMatchingVillainButton.widthAnchor.constraint(equalTo: selectVillainImageButton.widthAnchor).isActive = true
    checkForMatchingVillainButton.heightAnchor.constraint(equalTo: selectVillainImageButton.heightAnchor).isActive = true
    
  }
  
  required init?(coder aDecoder: NSCoder) {
    fatalError("init(coder:) has not been implemented")
  }
  
}

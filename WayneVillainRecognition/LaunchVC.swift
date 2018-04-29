//
//  ViewController.swift
//  WayneVillainRecognition
//
//  Created by Rigel on 4/23/18.
//  Copyright © 2018 Rigel. All rights reserved.
//

import UIKit

class LaunchVC: UIViewController {
  
  var launchView: LaunchView!
  
  override func viewDidLoad() {
    super.viewDidLoad()
    
    linkView()
    
    launchView.selectVillainImageButton.addTarget(self, action: #selector(handleSelectVillainImageButton), for: .touchUpInside)
    
    launchView.checkForMatchingVillainButton.addTarget(self, action: #selector(handleCheckForMatchingVillianButton), for: .touchUpInside)
    
  }
  
  func linkView() {
    launchView = LaunchView(frame: UIScreen.main.bounds)
    self.view = launchView
  }
  
  @objc func handleSelectVillainImageButton() {
    
    let alert = UIAlertController(title: "Select the suspected villain!", message: "Choose a method to select image", preferredStyle: .alert)
    let photoLibraryAlertAction = UIAlertAction(title: "Photos", style: .default, handler: handlePhotoLibraryAlertAction)
    let cameraAlertAction = UIAlertAction(title: "Camera", style: .default, handler: handleCameraAlertAction)
    let cancelAction = UIAlertAction(title: "Cancel", style: .cancel, handler: nil)
    alert.addAction(photoLibraryAlertAction)
    alert.addAction(cameraAlertAction)
    alert.addAction(cancelAction)
    
    self.present(alert, animated: true, completion: nil)
  }
  
  func handlePhotoLibraryAlertAction(alert: UIAlertAction) {
    let imagePicker = UIImagePickerController()
    imagePicker.modalPresentationStyle = .popover
    imagePicker.popoverPresentationController?.barButtonItem = navigationItem.leftBarButtonItem
    imagePicker.sourceType = .photoLibrary
    imagePicker.allowsEditing = true
    imagePicker.delegate = self
    present(imagePicker, animated: false, completion: nil)
  }
  
  func handleCameraAlertAction(alert: UIAlertAction) {
    let imagePicker = UIImagePickerController()
    imagePicker.sourceType = .camera
    imagePicker.allowsEditing = true
    imagePicker.delegate = self
    present(imagePicker, animated: true, completion: nil)
  }
  
  @objc func handleCheckForMatchingVillianButton() {
    
    if let imageToUpload = launchView.villainImage.image {
      let imgageJPG = UIImageJPEGRepresentation(imageToUpload, 0.2)
      var imageBase64 = imgageJPG?.base64EncodedString()
      
      let urlString = Secrets.url
      let url = URL(fileURLWithPath: urlString)
      
      var request = URLRequest(url: url)
      request.httpMethod = "POST"
      
      let postString = "image=(imageBase64)"
      //how to add APIKey to body?
      
      request.httpBody = postString.data(using: .utf8)
      
      let task = URLSession.shared.dataTask(with: request) { (data, response, error) in
        if error != nil {
          print(error)
        }
        
        guard let uwData = data else { print("no data"); return}
        
      }
      task.resume()
    }
  }
}

extension LaunchVC: UIImagePickerControllerDelegate, UINavigationControllerDelegate {
  
  func imagePickerController(_ picker: UIImagePickerController, didFinishPickingMediaWithInfo info: [String : Any]) {
    
    var selectedImageFromPicker: UIImage?
    
    // if allows editing on will always take from edited
    if let editedImage = info["UIImagePickerControllerEditedImage"] as? UIImage {
      print("editedImagePicked")
      selectedImageFromPicker = editedImage
      print("editedImage size")
      print(editedImage.size)
    }
    //    else if let originalImage = info["UIImagePickerControllerOriginalImage"] as? UIImage {
    //      selectedImageFromPicker = originalImage
    //      print("originalImagepicked")
    //      print(originalImage.size)
    //    }
    
    //assign selected image to imageview
    if let selectedImage = selectedImageFromPicker {
      launchView.villainImage.image = selectedImage
    }
    
    dismiss(animated: true, completion: nil)
    
  }
}

